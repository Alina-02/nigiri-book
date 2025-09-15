import { app, BrowserWindow, ipcMain, dialog } from "electron";
import serve from "electron-serve";
import path from "path";
import AdmZip from "adm-zip";
import { parseStringPromise } from "xml2js";

const __dirname = path.resolve();

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

  openFile(browserWindow, filePath);
};

const openFile = async (browserWindow, filePath) => {
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
  const creator =
    (meta["dc:creator"]?.[0]?._ || meta["dc:creator"]?.[0]) ?? null;
  const language = meta["dc:language"]?.[0] ?? null;
  const publisher = meta["dc:publisher"]?.[0] ?? null;
  const date = meta["dc:date"]?.[0] ?? null;
  const description = meta["dc:description"]?.[0] ?? null;

  console.log(title, creator, language, publisher, date, description);
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
