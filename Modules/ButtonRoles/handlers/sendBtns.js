const { Message, MessageEmbed, Channel } = require("discord.js");
const Buttons = require("../config/Buttons");
const Config = require("../config/Config");
const cleanObjects = require("../util/cleanObjects");
const compareObjects = require("../util/compareObjects");
const mostTrueInArray = require("../util/mostTrueInArray");
const orderObjects = require("../util/orderObjects");
const btnCreator = require("./btnCreator");

/**
 *
 * @param {Message} message
 * @param {Channel} channel
 */
module.exports = async (message, msgButtons, channel) => {
  const btns = [];
  const msgBtns = [];
  let btnEqual = false;
  let embedEqual = false;
  let contentEqual = false;

  btnCreator().components.forEach((btn) => {
    btn.type = "BUTTON";
    btn.customId = btn.custom_id;
    delete btn.custom_id;
    switch (btn.style) {
      case 1:
        btn.style = "PRIMARY";
        break;
      case 2:
        btn.style = "SECONDARY";
        break;
      case 3:
        btn.style = "SUCCESS";
        break;
      case 4:
        btn.style = "DANGER";
        break;
    }

    btns.push(orderObjects(btn));
  });

  const embed = {};
  for (const key in Buttons.embed) {
    if (message && !message.embeds[0]) continue;
    if (message && Object.keys(message.embeds[0]).includes(key)) {
      embed[key] = message.embeds[0][key];
    } else {
      continue;
    }
  }

  if (embed.color) {
    embed.color = `#${(
      (1 << 24) +
      (Math.floor(embed.color / (256 * 256)) << 16) +
      (Math.floor(embed.color / 256) % 256 << 8) +
      (embed.color % 256)
    )
      .toString(16)
      .slice(1)}`;
  }

  msgButtons.forEach((btn) => {
    msgBtns.push(orderObjects(btn));
  });

  const equalsBtns = [];
  btns.forEach((btn, i) => {
    if (compareObjects(msgBtns[i], btn) === true) equalsBtns.push(true);
    else equalsBtns.push(false);
  });

  btnEqual = mostTrueInArray(equalsBtns);
  embedEqual = compareObjects(cleanObjects(embed), cleanObjects(Buttons.embed));

  if (message && message.content === Buttons.content) {
    contentEqual = true;
  }

  if (
    Config.SendEveryStart === true ||
    contentEqual === false ||
    embedEqual === false ||
    btnEqual === false
  ) {
    if (!cleanObjects(Buttons.buttons[0]) || !btnCreator().components) return;
    if (Buttons.content) {
      channel.send({
        content: `${Buttons.content}`,
        components: [btnCreator()],
      });
    } else if (Buttons.content && cleanObjects(Buttons.embed) !== {}) {
      channel.send({
        content: `${Buttons.content}`,
        embeds: [new MessageEmbed(Buttons.embed)],
        components: [btnCreator()],
      });
    } else if (
      (!Buttons.content && cleanObjects(Buttons.embed) !== {}) ||
      (Buttons.content === "" && cleanObjects(Buttons.embed) !== {})
    ) {
      channel.send({
        embeds: [new MessageEmbed(Buttons.embed)],
        components: [btnCreator()],
      });
    }

    if (message && message.deletable) {
      await message.delete();
    }
  }
};
