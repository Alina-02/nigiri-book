import { app, BrowserWindow, ipcMain, dialog } from "electron";
import serve from "electron-serve";
import path from "path";
import AdmZip from "adm-zip";
import { parseStringPromise } from "xml2js";
import * as fs from "fs";
import * as fsPromises from "fs/promises";

const __dirname = path.resolve();

const BOOKS_FOLDER = path.join(`${app.getPath("userData")}`, "books");
const BOOKS_FILE = path.join(BOOKS_FOLDER, "books.json");

const appServe = app.isPackaged
  ? serve({
      directory: path.join(__dirname, "../out"),
    })
  : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1512,
    height: 982,
    minWidth: 600,
    webPreferences: {
      preload: path.join(__dirname, "main/preload.js"),
      contextIsolation: true,
    },
  });

  win.removeMenu();

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.on("ready", () => {
  createWindow();
});

ipcMain.handle("add-new-book", (event, shelfType) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);
  if (!browserWindow) return;
  return showOpenBook(browserWindow, shelfType);
});

ipcMain.handle("get-books-data", (event) => {
  return getBooksData();
});

ipcMain.handle("get-book-file", (_, filePath) => {
  return getBookFile(filePath);
});

ipcMain.on("update-book-data", (_, filePath, newBookData) => {
  updateBookData(filePath, newBookData);
});

const showOpenBook = async (browserWindow, shelfType) => {
  const result = await dialog.showOpenDialog(browserWindow, {
    properties: ["openFile"],
    filters: [{ name: "Book file", extensions: ["pdf", "epub"] }],
  });

  if (result.canceled) return;

  const [filePath] = result.filePaths;

  return saveNewBook(browserWindow, filePath, shelfType);
};

const saveNewBook = async (browserWindow, filePath, shelfType) => {
  // read epub as zip
  const zip = new AdmZip(filePath);

  //  read META-INF/container.xml
  const containerXml = zip.readAsText("META-INF/container.xml");
  const containerJson = await parseStringPromise(containerXml);

  const opfPath =
    containerJson?.container?.rootfiles?.[0]?.rootfile?.[0]?.$?.["full-path"];
  if (!opfPath) throw new Error("No se encontró el archivo OPF en el EPUB");

  // read opf
  const opfXml = zip.readAsText(opfPath);
  const opfJson = await parseStringPromise(opfXml);

  const meta = opfJson?.package?.metadata?.[0] || {};

  // information
  const title = meta["dc:title"]?.[0] ?? null;
  const author =
    (meta["dc:creator"]?.[0]?._ || meta["dc:creator"]?.[0]) ?? null;
  const description = meta["dc:description"]?.[0] ?? null;

  const cover = getBookCoverFromEpub(opfJson, meta, opfPath);

  const book = {
    title: normalizeField(title),
    author: normalizeField(author),
    description: normalizeField(description),
    saga: "",
    cover: cover ? cover : "",
    file: filePath,

    initDate: [],
    endDate: [],
    valoration: undefined,
    review: undefined,
    quotes: [],
    comments: [],
    state: shelfType !== "FAVOURITE" ? shelfType : "PENDING",
    progressPage: 0,
    favourite: shelfType === "FAVOURITE",
    lastOpened: Date.now(),
  };
  console.log(shelfType, "type");
  console.log(shelfType !== "FAVOURITE" ? shelfType : "PENDING");
  try {
    if (!fs.existsSync(BOOKS_FOLDER)) {
      fs.mkdirSync(BOOKS_FOLDER, { recursive: true });
    }

    const safeTitle = String(book.title || "untitled");
    const epubFileName = `${safeTitle.replace(/[^a-z0-9]/gi, "_")}.epub`;
    const destEpubPath = path.join(BOOKS_FOLDER, epubFileName);

    fs.copyFileSync(filePath, destEpubPath);

    let books = [];
    if (fs.existsSync(BOOKS_FILE)) {
      const data = fs.readFileSync(BOOKS_FILE, "utf-8");
      books = JSON.parse(data);
    }

    books.unshift(book);

    fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2), "utf-8");
    return books;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const normalizeField = (field) => {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    if ("_" in field) return field._;
  }
  return String(field);
};

const getBookCoverFromEpub = ({ opfJson, meta, opfPath }) => {
  // cover
  let coverBase64;
  try {
    const manifest = opfJson?.package?.manifest?.[0]?.item || [];
    const coverMeta = meta.meta?.find((m) => m.$?.name === "cover");
    const coverId = coverMeta?.$?.content;
    const coverItem = manifest.find((i) => i.$?.id === coverId);
    if (coverItem) {
      const coverPath = coverItem.$.href;
      const opfDir = opfPath.substring(0, opfPath.lastIndexOf("/") + 1);
      const fullCoverPath = opfDir + coverPath;
      const coverBuffer = zip.readFile(fullCoverPath);
      if (coverBuffer) {
        return (coverBase64 = `data:image/${coverPath
          .split(".")
          .pop()};base64,${coverBuffer.toString("base64")}`);
      }
    }
  } catch (e) {
    console.warn("Error extracting the cover:", e);
  }
};

const getBooksData = () => {
  try {
    if (!fs.existsSync(BOOKS_FILE)) {
      return [];
    }

    const raw = fs.readFileSync(BOOKS_FILE, "utf-8");
    if (!raw.trim()) {
      return [];
    }

    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error getting books information:", err);
    return [];
  }
};

const getBookFile = async (filePath) => {
  if (!fs.existsSync(BOOKS_FOLDER)) {
    return;
  }

  const data = fs.readFileSync(filePath);
  return data.toString("base64");
};

const updateBookData = async (filePath, newBookData) => {
  if (!filePath || !newBookData) {
    console.error("Error: filePath and newBookData must be provided.");
  }

  try {
    const raw = await fsPromises.readFile(BOOKS_FILE, "utf-8");
    const data = raw.trim() ? JSON.parse(raw) : [];

    if (!Array.isArray(data)) {
      console.error("Error: Book data file is not a valid JSON array.");
    }

    const index = data.findIndex((book) => book.file === filePath);

    if (index === -1) {
      console.warn(`Book with filePath "${filePath}" not found.`);
    }
    data[index] = newBookData;

    fs.writeFileSync(BOOKS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`Error: The file at ${BOOKS_FILE} was not found.`);
    } else if (error instanceof SyntaxError) {
      console.error("Error: Failed to parse JSON. File may be corrupt.");
    } else {
      console.error(
        "An unexpected error occurred while updating book data:",
        error
      );
    }
  }
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
