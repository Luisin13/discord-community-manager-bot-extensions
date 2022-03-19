# How to config this modules?

First open `config.js`, it should be looking like this:

```js
module.exports = {
  SendEveryStart: true, //Recomended
};
```

as recomended keep `SendEveryStart` turned on<br />

After looking at `Config.js`, open `Button.js`, it should be looking like this:

```js
module.exports = {
  channelId: "123456789012345678",
  content: "",
  error: "Error while adding/removing the role",
  roleAdded: "Role {{role}} added to {{user}}",
  //Variables: {{user}}, {{role}}
  roleRemoved: "Role {{role}} removed from {{user}}",
  //Variables: {{user}}, {{role}}
  embed: {
    title: "Button roles",
    description: "Click below to receive the roles",
    image: "",
    thumbnail: "",
    color: "#251bab",
  },
  buttons: [
    {
      text: "Test button 1",
      emoji: "",
      roleId: "123456789012345678",
      color: "green",
    },
  ],
};
```

if it looks like this, you need to configure somethings, like the buttons, for this you will need to have <a href="support.discord.com/hc/articles/206346498">developer mode<a/> activated, after having developer mode activated, get the channel id you want to have the button roles, and place in the `channelId parameter`, now you can costumize the messages for everything, now for the buttons, if you want to have more buttons, paste this:

```js
{
    text: "Test button 1",
    emoji: "",
    roleId: "123456789012345678",
    color: "green",
},
```

after the first role, now you can change the text and color, available colors: `red, green, blue, grey`, now about the role id, type \ in the chat and after slash mention the role, when you send the message, it will show the id, if you want the emoji you can do the same thing, but with emoji, it only works with custom emojis
