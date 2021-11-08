const Module = require("module");
const { join, dirname } = require("path");

const electron = require("electron");
const { ipcMain, BrowserWindow, Tray, nativeImage, Menu } = require("electron");
const electronPath = require.resolve("electron");

const discordPath = join(dirname(require.main.filename), "..", "app.asar");
const discordPackage = require(join(discordPath, "package.json"));

/* Extend Electron's Browser Window to inject custom code Thank you @powercord for this. */

class ColorDiscordWindow extends BrowserWindow {
  constructor(opts) {
    let OGPreload;
    if (opts.webContents) {
    } else if (opts.webPreferences && opts.webPreferences.nodeIntegration) {
    } else if (opts.webPreferences && opts.webPreferences.preload) {
      OGPreload = opts.webPreferences.preload;

      if (opts.webPreferences.nativeWindowOpen) {
        /* Put in our custom preload to be used instead of discord's normal one */
        opts.webPreferences.preload = join(__dirname, "preload.js");
      }
    } else {
    }

    let win = new BrowserWindow(opts);
    let originalurl = win.loadURL.bind(win);

    win.webContents.colordiscordPreload = OGPreload;
    return win;
  }

  static loadUrl(origLoadURL, URL, options) {
    return origLoadURL(URL, options);
  }
}

require.main.filename = join(discordPath, "app_bootstrap/index.js");

ipcMain.on(
  "COLORDISCORD_GET_PRELOAD",
  (e) => (e.returnValue = e.sender.colordiscordPreload)
);

let patched = false;

const appSetUserModelId = electron.app.setAppUserModelId;

function setAppUserModelId(...args) {
  appSetUserModelId.apply(this, args);
  if (!patched) {
    patched = true;
  }
}

electron.app.setAppUserModelId = setAppUserModelId;

const eExports = new Proxy(electron, {
  get(target, prop) {
    switch (prop) {
      case "BrowserWindow": {
        return ColorDiscordWindow;
      }
      default:
        return target[prop];
    }
  },
});

delete require.cache[electronPath].exports;
require.cache[electronPath].exports = eExports;

// const discordPackage = require(join(discordPath, "package.json"));
electron.app.setAppPath(discordPath);
electron.app.name = discordPackage.name;

Module._load(join(discordPath, discordPackage.main), null, true);
