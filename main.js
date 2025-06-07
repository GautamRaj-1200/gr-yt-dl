const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");
const { autoUpdater } = require("electron-updater");

// Function to get the correct path for yt-dlp.exe
function getYtDlpPath() {
  if (app.isPackaged) {
    // When packaged, yt-dlp.exe should be inside the resources folder
    return path.join(process.resourcesPath, "yt-dlp.exe");
  } else {
    // In development, yt-dlp.exe is in the current directory
    return path.join(__dirname, "yt-dlp.exe");
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    icon: path.join(__dirname, "assets", "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "renderer.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html").then(() => {
    // Send default downloads folder path to renderer
    const downloadsPath = app.getPath("downloads");
    const defaultFolder = path.join(downloadsPath, "GR Youtube DL");

    if (!fs.existsSync(defaultFolder)) {
      fs.mkdirSync(defaultFolder, { recursive: true });
    }
    win.webContents.send("default-folder", defaultFolder);
  });
}

app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  return result.filePaths[0];
});

ipcMain.on("start-download", (event, args) => {
  const { url, format, folder } = args;
  const ytDlpPath = getYtDlpPath();

  let command;

  if (!format && !folder) {
    // Default mode: no format, no folder
    command = [ytDlpPath, "--no-mtime", url];
  } else if (!format && folder) {
    // No format, folder specified
    const outputTemplate = path.join(folder, "%(title)s.%(ext)s");
    command = [ytDlpPath, "--no-mtime", "-o", outputTemplate, url];
  } else {
    // Format specified, folder optional
    const outputTemplate = folder
      ? path.join(folder, "%(title)s.%(ext)s")
      : "%(title)s.%(ext)s";
    command = [ytDlpPath, "--no-mtime", "-f", format, "-o", outputTemplate, url];
  }

  const process = spawn(command[0], command.slice(1));

  process.on("error", (err) => {
    event.sender.send("log", `SPAWN ERROR: ${err.message}\n`);
  });

  process.stdout.on("data", (data) => {
    event.sender.send("log", data.toString());
  });

  process.stderr.on("data", (data) => {
    event.sender.send("log", "ERROR: " + data.toString());
  });

  process.on("close", (code) => {
    if (code === 0) {
      event.sender.send("download-complete", {
        success: true,
        message: "Download completed successfully!",
      });
    } else {
      event.sender.send("download-complete", {
        success: false,
        message: "Download failed. Please check the log for details.",
      });
    }
  });
});
