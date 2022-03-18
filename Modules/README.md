# Best Practices for creating Modules

Make it configurable in the module file, and for locales use the bot locales folder, that's it for now

# Example configuration for module `Index.js`

```js
const { Client } = require("discord.js");

module.exports.moduleInfo = {
  name: "Module-name",
  author: "Module-author",
  github: "Module-github",
};

/**
 *
 * @param {Client} Client
 */
module.exports.run = (Client) => {
  //Your code
};
```
