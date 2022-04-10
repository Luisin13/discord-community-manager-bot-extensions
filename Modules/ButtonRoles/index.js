const { Client, MessageButton } = require("discord.js");
const Buttons = require("./config/Buttons");
const startUp = require("./handlers/startUp");

module.exports.moduleInfo = {
  name: "Button Roles",
  author: "Luisin13",
  github:
    "https://github.com/Luisin13/discord-community-manager-bot-extensions",
};

/**
 *
 * @param {Client} Client
 */
module.exports.run = async (Client) => {
  startUp(Client);
};
