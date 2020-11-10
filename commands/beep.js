const Discord = require("discord.js")

module.exports = {
  name:'beep',
  description: 'beep command',
  execute( message, args){

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription("Boop")

    message.channel.send(Display)
  }
}