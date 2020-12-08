const Database = require("@replit/database")
const Discord = require('discord.js')
const client = new Discord.Client()
const db = new Database()
const prefix = 'meet '
const list = ['aaa', 'aab', 'aac', 'aad', 'aae']
function status(key, messagee) {
  if (list.includes(key)) {
    db.get(key).then(value => {
      messagee.channel.send('The value of room ' + key + ' is ' + value + '.')
    })
  } else {
    messagee.reply('that is not a valid room.')
  }
}
function close(key, messagee) {
  if (list.includes(key)) {
    db.set(key, "closed").then(value => {
      messagee.reply('closed the room.')
    })
  } else {
    messagee.reply('that is not a valid room.')
  }
}
function open(key, messagee) {
  if (list.includes(key)) {
    db.set(key, "open").then(value => {
      messagee.reply('opened the room.')
    })
  } else {
    messagee.reply('that is not a valid room.')
  }
}

client.once('ready', () => {
  console.log('ready');
});

client.on('message', message => {
if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (command === 'help') {
    message.channel.send('**Help Menu**\nTo close a meeting room, use "meet close <room>". E.g. "meet close aaa".\nTo open a meeting room, use "meet open <room>.\nTo get a meeting room status, use "meet status <room>.');
  }
  if (command === 'status') {
    if (!args.length) {
      return message.reply('please add the meeting room you want to check.')
    }
    status(args[0], message);
  }
  if (command === 'close') {
    if (!args) {
      return message.reply('please add the meeting room you want to close.');
    }
    close(args[0], message);
  }
  if (command === 'open') {
    if (!args) {
      return message.reply('please add the meeting room you want to open.');
    }
    open(args[0], message);
  }
  if (command === 'listrooms') {
    const keyss = list.join();
    keys = keyss.replace(/\,/g, " ");
    message.reply('The rooms are:\n'+keys);
  }
})

client.login('NzI5MDYxMjI4NDM3MDQ1MzMw.XwDdLg.UcVZocvNok7iBLX6i9fvyEEgx-k');