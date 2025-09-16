import { app, BrowserWindow, ipcMain, dialog } from "electron";
import serve from "electron-serve";
import path from "path";
import AdmZip from "adm-zip";
import { parseStringPromise } from "xml2js";
import fs from "fs";

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

ipcMain.on("show-open-dialog", (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);
  if (!browserWindow) return;
  showOpenBook(browserWindow);
});

const showOpenBook = async (browserWindow) => {
  const result = await dialog.showOpenDialog(browserWindow, {
    properties: ["openFile"],
    filters: [{ name: "Book file", extensions: ["pdf", "epub"] }],
  });

  if (result.canceled) return;

  const [filePath] = result.filePaths;

  saveNewBook(browserWindow, filePath);
};

const saveNewBook = async (browserWindow, filePath) => {
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
    title,
    author,
    description,
    saga: "",
    cover: cover ? cover : "",
    file: filePath,

    initDate: [],
    endDate: [],
    valoration: undefined,
    review: undefined,
    quotes: [],
    comments: [],
    state: "PENDANT",
    progressPage: 0,
    favourite: false,
  };

  console.log(book);

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

    books.push(book);

    fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2), "utf-8");
    return { success: true, newBooks: books };
  } catch (err) {
    console.error(err);
    return { success: false, error: err };
  }
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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
