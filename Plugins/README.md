# Best Practices for creating Plugins

Make it configurable in the plugin file, that's it for now

# Example configuration for Ready Event Plugin

```js
const { Client } = require("discord.js");

module.exports.pluginInfo = {
  name: "Plugin-name",
  author: "Plugin-author",
  github: "Plugin-github",
};

/**
 *
 * @param {Client} Client
 */
module.exports.run = (Client) => {
  //Your code
};
```

# Example configuration for MessageCreate Event Plugin

```js
const { Message, Client } = require("discord.js");

module.exports.pluginInfo = {
  name: "Plugin-name",
  author: "Plugin-author",
  github: "Plugin-github",
};

/**
 *
 * @param {Message} message
 * @param {Client} Client
 */
module.exports.run = (message, Client) => {
  //Your code
};
```
