const { MessageButton, MessageActionRow } = require("discord.js");
const Buttons = require("../config/Buttons");

module.exports = () => {
  const btns = [];
  Buttons.buttons.forEach((_, i) => {
    const btn = Buttons.buttons[i];
    let style;
    if (btn.color.toLowerCase() === "red") {
      style = "DANGER";
    } else if (btn.color.toLowerCase() === "green") {
      style = "SUCCESS";
    } else if (btn.color.toLowerCase() === "grey") {
      style = "SECONDARY";
    } else if (btn.color.toLowerCase() === "blue") {
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
