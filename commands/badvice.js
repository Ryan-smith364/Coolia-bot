const fetch = require("node-fetch");
const Discord = require("discord.js")


module.exports = {
  name:'badvice',
  description: 'gives good advice',
  execute( message, args){

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')

    fetch('https://api.adviceslip.com/advice')
      .then(resp => resp.json())
      .then(advice => {
        Display.setDescription(advice.slip.advice)
        message.channel.send(Display)
      })
  }
}