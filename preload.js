const { ipcRenderer } = require("electron");

const ColorDiscord = require("./ColorDiscord");
const cd = new ColorDiscord();

const preload = ipcRenderer.sendSync("COLORDISCORD_GET_PRELOAD");

if (preload) {
  require(preload);
}
