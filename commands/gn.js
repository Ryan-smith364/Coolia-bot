const Discord = require("discord.js");

module.exports = {
  name:'gn',
  description: 'A tender goodnight',
  execute( message, args){
    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription("Get some rest champ you've earned it")

    message.channel.send(Display)
    
  }
}