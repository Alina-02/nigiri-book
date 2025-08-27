import { app, BrowserWindow } from "electron";
import serve from "electron-serve";
import path from "path";

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
      preload: path.join(__dirname, "preload.js"),
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
