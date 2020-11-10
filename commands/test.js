const Discord = require("discord.js")
const fetch = require("node-fetch");



module.exports = {
  name:'test',
  description: 'A Test',
  cooldown: 5,
  execute( message, args){
    var board = ['\n', '🔵', '🔵', '🔵', '\n', '🔵', '🔵', '🔵', '\n', '🔵', '🔵', '🔵']
    var turns = 0
    var winConditions = [ [1, 2, 3], [5, 6, 7], [9, 10, 11], [1, 5, 9],  [2, 6, 10], [3, 7, 11], [1, 6, 11], [3, 6, 9]]

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription(board)

    message.channel.send(Display)
  }
}