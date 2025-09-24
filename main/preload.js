// eslint-disable-next-line @typescript-eslint/no-require-imports
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  on: (channel, callback) => {
    ipcRenderer.on(channel, callback);
  },
  send: (channel, args) => {
    ipcRenderer.send(channel, args);
  },
  showOpenBook: () => {
    ipcRenderer.send("show-open-dialog");
  },
  getBooksData: () => {
    return ipcRenderer.invoke("get-books-data");
  },
  getBookFile: (filePath) => {
    return ipcRenderer.invoke("get-book-file", filePath);
  },
  updateBookData: (filePath, newBookData) => {
    return ipcRenderer.send("update-book-data", filePath, newBookData);
  },
});
