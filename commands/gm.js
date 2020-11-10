const Discord = require("discord.js");

module.exports = {
  name:'gm',
  description: 'A kind Goodmorning',
  execute( message, args){
    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription('Good Morning, I hope you have a wonderful day!')

    message.channel.send(Display)
  }
}