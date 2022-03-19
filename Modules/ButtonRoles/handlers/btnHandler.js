const { Client } = require("discord.js");
const Buttons = require("../config/Buttons");

/**
 *
 * @param {Client} Client
 */
module.exports = async (Client) => {
  Client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {
      try {
        let button =
          Buttons.buttons[
            Buttons.buttons.findIndex(
              (btn) => interaction.customId === btn.text
            )
          ];
        const user = interaction.user;

        if (
          interaction.guild.members.cache
            .get(user.id)
            .roles.cache.has(button.roleId)
        ) {
          interaction.guild.members.cache
            .get(user.id)
            .roles.remove(button.roleId);
          interaction.reply({
            content: `${Buttons.roleRemoved
              .replace(/(\{\{user\}\})/gm, interaction.user)
              .replace(/(\{\{role\}\})/gm, `<@&${button.roleId}>`)}`,
            ephemeral: true,
          });
        } else {
          interaction.guild.members.cache.get(user.id).roles.add(button.roleId);
          interaction.reply({
            content: `${Buttons.roleAdded
              .replace(/(\{\{user\}\})/gm, interaction.user)
              .replace(/(\{\{role\}\})/gm, `<@&${button.roleId}>`)}`,
            ephemeral: true,
          });
        }
      } catch (err) {
        interaction.reply({ content: `${Buttons.error}`, ephemeral: true });
      }
    }
  });
};
