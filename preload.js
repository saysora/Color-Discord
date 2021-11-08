const { ipcRenderer } = require("electron");

/* Pull in our Color Discord class and instantiate it */
const ColorDiscord = require("./ColorDiscord");
const cd = new ColorDiscord();

/* Notify discord of preload */
const preload = ipcRenderer.sendSync("COLORDISCORD_GET_PRELOAD");

if (preload) {
  require(preload);
}
