const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {

  const myWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 1000,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });
  //myWindow.removeMenu();
  myWindow.loadFile("index.html");
});

