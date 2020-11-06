const Discord = require("discord.js")
const fetch = require("node-fetch");



module.exports = {
  name:'test',
  description: 'A Test',
  cooldown: 5,
  execute( message, args){
    // message.channel.messages.fetch({around: "773583923522961468", limit: 1})
    // .then(messages => {
    //   messages.first().edit("This fetched message was edited");
    // });

    message.channel.send('Message that goes above image', {
      files: [
        "./img/Blackjack.png"
      ]
    })
  }
}