const { Client, MessageEmbed } = require("discord.js");
const Buttons = require("../config/Buttons");
const btnCreator = require("./btnCreator");
const btnHandler = require("./btnHandler");
const sendBtns = require("./sendBtns");
const sleep = require(`${process.cwd()}/src/util/sleep`);

/**
 *
 * @param {Client} Client
 */
module.exports = async (Client) => {
  const channel = await Client.channels.fetch(Buttons.channelId);
  const buttons = [];
  let message = [];
  const messages = await channel.messages.fetch();

  message.push(
    messages
      .filter(
        (m) =>
          m.author.id === Client.user.id &&
          m.type === "DEFAULT" &&
          m.components !== null &&
          m.interaction === null
      )
      .first()
  );
  sleep(100);
  message = message.shift();

  if (message && message.components) {
    message.components[0].components.forEach((component) => {
      if (component.type === "BUTTON") {
        buttons.push(component);
      }
    });
  } else {
  }

  sendBtns(message, buttons, channel);
  btnHandler(Client);
};
