const { MessageButton, MessageActionRow } = require("discord.js");
const Buttons = require("../config/Buttons");

module.exports = () => {
  const btns = [];
  Buttons.buttons.forEach((btn) => {
    let style;
    if ((btn.color = /(red)/)) {
      style = "DANGER";
    }
    if ((btn.color = /(green)/)) {
      style = "SUCCESS";
    }
    if ((btn.color = /(grey)/)) {
      style = "SECONDARY";
    }
    if ((btn.color = /(blue)/)) {
      style = "PRIMARY";
    }

    if (!btn.text || btn.text == "" || !btn.roleId || btn.roleId == "") return;
    let button;
    if (btn.emoji !== "" && btn.emoji) {
      button = new MessageButton({
        label: `${btn.text}`,
        customId: `${btn.text}`,
        emoji: `${btn.emoji}`,
        style: `${style}`,
      });
    } else {
      button = new MessageButton({
        label: `${btn.text}`,
        customId: `${btn.text}`,
        style: `${style}`,
      });
    }
    btns.push(button);
  });

  // console.log(new MessageActionRow({components: btns}))
  return new MessageActionRow({ components: btns }).toJSON();
};
