const { ipcRenderer } = require("electron");

let selectedFolder = "";

// Listen for default folder from main process
ipcRenderer.on("default-folder", (event, defaultFolder) => {
  selectedFolder = defaultFolder;
  document.getElementById("folderPath").textContent = selectedFolder;
});

async function chooseFolder() {
  selectedFolder = await ipcRenderer.invoke("select-folder");
  document.getElementById("folderPath").textContent =
    selectedFolder || "No folder selected";
}

function download() {
  const url = document.getElementById("url").value;
  const format = document.getElementById("format").value;
  const log = document.getElementById("log");
  const status = document.getElementById("download-status");

  if (!url) {
    log.textContent += "Please enter a URL.\n";
    return;
  }

  if (!selectedFolder) {
    log.textContent += "Please select a folder before downloading.\n";
    return;
  }

  log.textContent = "";
  status.textContent = "Downloading...";
  status.style.color = "yellow";

  ipcRenderer.send("start-download", { url, format, folder: selectedFolder });
}

ipcRenderer.on("log", (event, message) => {
  const log = document.getElementById("log");
  log.textContent += message.replace(/\r/g, "\n");
  log.scrollTop = log.scrollHeight;
});

ipcRenderer.on("download-complete", (event, result) => {
  const status = document.getElementById("download-status");
  status.textContent = result.message;
  status.style.color = result.success ? "#28a745" : "#dc3545";

  const log = document.getElementById("log");
  log.textContent += `\n${result.message}\n`;
  log.scrollTop = log.scrollHeight;
});
