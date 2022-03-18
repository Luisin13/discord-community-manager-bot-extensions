const { Message, MessageEmbed, WebhookClient, Client } = require("discord.js");
const config = require(`${process.cwd()}/config.js`);

const pluginConfig = {
  WEBHOOKURL:
    "https://discord.com/api/webhooks/949873725958914060/ZYvtCF3ekbHcB-t-rsw4RRqH1wfgnT4yvoTT8tQ-7lFp45Kn8d2bLAN7Z2AhfRqEQsav",
  EMBED: {
    COLOR: "#0088ff", //Hex Color

    DESCRIPTION:
      "Comando usado: `{{prefix}}{{cmd}}`\nArgumentos: `{{args}}`\nCanal: {{channel}} ({{channelId}})",
    //Description Variables: {{prefix}}, {{cmd}}, {{args}}, {{channel}}, {{channelId}}, {{channelName}}, {{author}}, {{authorId}}, {{authorName}}

    TITLE: "{{authorTag}} ({{authorId}})",
    //Title Variables: {{prefix}}, {{cmd}}, {{args}}, {{channelName}}, {{channelId}}, {{authorTag}}, {{authorId}}, {{authorName}}

    NOARGSTEXT: "Sem argumentos",
    //Text in case there isnt args

    //Keep in mind that {{args}} might be empty if there isnt NOARGSTEXT
    //DESCRIPTION and TITLE are REQUIRED
  },
};

module.exports.pluginInfo = {
  name: "CommandLogger",
  author: "Luisin13",
  githubRepo: "https://github.com/Luisin13",
};

/**
 *
 * @param {Message} message
 * @param {Client} Client
 */
module.exports.run = async (message, Client) => {
  if (!pluginConfig.WEBHOOKURL || pluginConfig.WEBHOOKURL == "")
    return console.log("Invalid WebhookUrl");
  if (!pluginConfig.EMBED.TITLE || pluginConfig.EMBED.TITLE == "")
    return console.log("Missing Embed Title");
  if (!pluginConfig.EMBED.DESCRIPTION || pluginConfig.EMBED.DESCRIPTION == "")
    return console.log("Missing Embed Description");

  let args = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  const embed = new MessageEmbed()
    .setTitle(
      `${
        args.join("") == ""
          ? pluginConfig.EMBED.TITLE.replace(/{{prefix}}/gm, config.PREFIX)
              .replace(/{{cmd}}/gm, cmd)
              .replace(/{{args}}/gm, pluginConfig.EMBED.NOARGSTEXT || " ")
              .replace(/{{channelName}}/gm, message.channel.name)
              .replace(/{{channelId}}/gm, message.channelId)
              .replace(/{{authorTag}}/gm, message.author.tag)
              .replace(/{{authorId}}/gm, message.author.id)
              .replace(/{{authorName}}/gm, message.author.username)
          : pluginConfig.EMBED.TITLE.replace(/{{prefix}}/gm, config.PREFIX)
              .replace(/{{cmd}}/gm, cmd)
              .replace(/{{args}}/gm, args.join(" "))
              .replace(/{{channelName}}/gm, message.channel.name)
              .replace(/{{channelId}}/gm, message.channelId)
              .replace(/{{authorTag}}/gm, message.author.tag)
              .replace(/{{authorId}}/gm, message.author.id)
              .replace(/{{authorName}}/gm, message.author.username)
      }`
    )
    .setDescription(
      `${
        args.join("") == ""
          ? pluginConfig.EMBED.DESCRIPTION.replace(
              /{{prefix}}/gm,
              config.PREFIX
            )
              .replace(/{{cmd}}/gm, cmd)
              .replace(/{{args}}/gm, pluginConfig.EMBED.NOARGSTEXT || " ")
              .replace(/{{channel}}/gm, message.channel)
              .replace(/{{channelName}}/gm, message.channel.name)
              .replace(/{{channelId}}/gm, message.channelId)
              .replace(/{{author}}/gm, message.author)
              .replace(/{{authorTag}}/gm, message.author.tag)
              .replace(/{{authorId}}/gm, message.author.id)
              .replace(/{{authorName}}/gm, message.author.username)
          : pluginConfig.EMBED.DESCRIPTION.replace(
              /{{prefix}}/gm,
              config.PREFIX
            )
              .replace(/{{cmd}}/gm, cmd)
              .replace(/{{args}}/gm, args.join(" "))
              .replace(/{{channel}}/gm, message.channel)
              .replace(/{{channelName}}/gm, message.channel.name)
              .replace(/{{channelId}}/gm, message.channelId)
              .replace(/{{author}}/gm, message.author)
              .replace(/{{authorTag}}/gm, message.author.tag)
              .replace(/{{authorId}}/gm, message.author.id)
              .replace(/{{authorName}}/gm, message.author.username)
      }`
    );

  pluginConfig.EMBED.COLOR != ""
    ? embed.setColor(`${pluginConfig.EMBED.COLOR}`)
    : "";
  const webhookClient = new WebhookClient({ url: pluginConfig.WEBHOOKURL });
  await webhookClient.send({
    username: "Command Log",
    avatarURL: Client.user.avatarURL({ size: 2048, format: "png" }),
    embeds: [embed],
  });
};
