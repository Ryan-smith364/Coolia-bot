const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name:'compliment',
  description: 'sends a random compliment to either a user or the sender',
  execute( message, args){

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')

    console.log(message.mentions.users.first())
    fetch('https://complimentr.com/api')
        .then(resp => resp.json())
        .then(json => {if(message.mentions.users.first() === undefined){
          Display.setDescription(`<@${message.author.id}> ` + json.compliment)
          message.channel.send(Display)
        }else{
          Display.setDescription(`<@${message.mentions.users.first().id}> ` + json.compliment)
          message.channel.send(Display)
        }
  })}
}