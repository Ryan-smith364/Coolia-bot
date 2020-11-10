const Discord = require("discord.js")

module.exports = {
  name:'poll',
  description: 'creates a message √ / x reactions',
  execute( message, args){
    message.delete()
    const pollContent = message.content.split(" ")
    pollContent.shift()
    const join = pollContent.join(" ")

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription("Question:" + " " + join)
       
    message.channel.send(Display)
      .then(async function (message) {
          message.react('✅')
          message.react('❌')
      })
  }
}