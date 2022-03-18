const { Client } = require("discord.js");
const express = require("express");
const config = require(`${process.cwd()}/config.js`);

module.exports.pluginInfo = {
  name: "KeepAlive",
  author: "Luisin13",
  githubRepo: "https://github.com/Luisin13",
};

/**
 *
 * @param {Client} Client
 */
module.exports.run = async (Client) => {
  const app = express();

  /**
   *
   * @param {Number} seconds
   */
  function format(seconds) {
    function pad(s) {
      return (s < 10 ? "0" : "") + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor((seconds % (60 * 60)) / 60);
    var seconds = Math.floor(seconds % 60);

    return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  }

  app.get("/", (req, res) => {
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible' content="IE=edge" /> <metaname="viewport' content="width=device-width, initial-scale=1.0" /> <linkrel="preconnect' href="https://fonts.googleapis.com" /> <linkrel="preconnect' href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap"rel="stylesheet"/><title>Bot</title></head><body style="background-color: #252525; color: white"><div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"></div><h1 style="text-align: center; font-family: 'Ubuntu', sans-serif">{{bot}} online!</h1><p style="text-align: center; font-family: 'Ubuntu', sans-serif">UpTime: {{up}}</p></div></body></html>`;

    res.send(
      html
        .replace(/{{up}}/gm, format(process.uptime()))
        .replace(/{{bot}}/gm, Client.user.tag)
    );
  });

  app.listen(3000);
};
