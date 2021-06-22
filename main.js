// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");

const PY_DIST_FOLDER = "pyflaskdist";
const PY_FOLDER = "pyflask";
const PY_MODULE = "api";

let pyProc = null;
const pyPort = "5000"; // Flask default port

const guessPackaged = () => {
  const fullPath = path.join(__dirname, PY_DIST_FOLDER);
  return require("fs").existsSync(fullPath);
};

// check if the python dist folder exists
const getScriptPath = () => {
  if (!guessPackaged()) {
    return path.join(__dirname, PY_FOLDER, PY_MODULE + ".py");
  }
  if (process.platform === "win32") {
    return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE + ".exe");
  }

  return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE);
};

// create the python process
const createPyProc = () => {
  let script = getScriptPath();

  if (guessPackaged()) {
    pyProc = require("child_process").execFile(script, [pyPort], {
      stdio: "ignore",
    });
  } else {
    pyProc = require("child_process").spawn("python", [script, pyPort], {
      stdio: "ignore",
    });
  }

  if (pyProc != null) {
    console.log("child process success on port " + pyPort);
  } else {
    console.error("child process failed to start on port" + pyPort);
  }
};

// Close the webserver process on app exit
const exitPyProc = () => {
  pyProc.kill();
  pyProc = null;
  pyPort = null;
};

app.on("ready", createPyProc);
app.on("will-quit", exitPyProc);

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    center: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
