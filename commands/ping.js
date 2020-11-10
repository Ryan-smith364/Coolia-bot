const Discord = require("discord.js")

module.exports = {
  name:'ping',
  description: 'Ping command',
  execute( message, args){

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription("Pong")

    message.channel.send(Display)
  }
}