const { Message, Client } = require("discord.js");
const { distance } = require("fastest-levenshtein");
const { compareTwoStrings } = require("string-similarity");
const config = require(`${process.cwd()}/config.js`);
const sleep = require(`${process.cwd()}/src/util/sleep.js`);

const pluginConfig = {
  MESSAGE:
    "{{author}}, você quis dizer `{{prefix}}{{didYouMean}}`? {{match}}% de similaridade entre `{{prefix}}{{cmd}}` e `{{prefix}}{{didYouMean}}`!",
  //Variables: {{cmd}}, {{didYouMean}}, {{prefix}}, {{author}}, {{authorId}}, {{channel}}, {{channelId}}, {{match}}
  NOTFOUND:
    "{{author}}, não achei nenhum comando parecido com `{{prefix}}{{cmd}}`!",
  //Variables: {{cmd}}, {{prefix}}, {{author}}, {{authorId}}, {{channel}}, {{channelId}}

  //MESSAGE and NOTFOUND is REQUIRED
};

module.exports.pluginInfo = {
  name: "DidYouMean",
  author: "Luisin13",
  githubRepo: "https://github.com/Luisin13",
};

/**
 *
 * @param {Message} message
 * @param {Client} Client
 */
module.exports.run = async (message, Client) => {
  if (!pluginConfig.MESSAGE || pluginConfig.MESSAGE == "")
    return console.log("Missing Message");
  if (!pluginConfig.NOTFOUND || pluginConfig.NOTFOUND == "")
    return console.log("Missing NotFound");

  let args = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
  let scmd = args.shift().toLowerCase();
  const close = Client.CommandCollection.filter(({ help }) => {
    const cmd = help.name;
    return distance(scmd, cmd) < scmd.length * 0.5 && scmd !== cmd;
  });
  let best = [];
  for (const str of close) {
    best.push(str);
  }

  if (best[0]) {
    if (best[0][1]) {
      const match = scmd.split(best[0][1].help.name).join("");
      const SendMessage = pluginConfig.MESSAGE.replace(
        /({{author}})/gm,
        message.author
      )
        .replace(/{{authorId}}/gm, message.author.id)
        .replace(/{{prefix}}/gm, config.PREFIX)
        .replace(/{{didYouMean}}/gm, best[0][1].help.name)
        .replace(/{{cmd}}/gm, scmd)
        .replace(/{{channel}}/gm, message.channel)
        .replace(/{{channelId}}/gm, message.channel.id)
        .replace(
          /{{match}}/gm,
          (compareTwoStrings(best[0][1].help.name, match) * 100).toFixed(2)
        );
      message.reply(SendMessage);
    }
  } else {
    message.reply(
      pluginConfig.NOTFOUND.replace(/({{author}})/gm, message.author)
        .replace(/{{authorId}}/gm, message.author.id)
        .replace(/{{prefix}}/gm, config.PREFIX)
        .replace(/{{cmd}}/gm, scmd)
        .replace(/{{channel}}/gm, message.channel)
        .replace(/{{channelId}}/gm, message.channel.id)
    );
  }
};
