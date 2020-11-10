const fetch = require("node-fetch");
const Discord = require("discord.js")


module.exports = {
  name:'advice',
  description: 'bad advice command',
  execute( message, args){

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')

    fetch('https://badadvice.rest/api/random')
      .then(resp => resp.json())
      .then(advice => {
        Display.setDescription(advice)
        message.channel.send(Display)
      }) 
  }
}