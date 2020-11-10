const fetch = require("node-fetch");
const Discord = require("discord.js")

module.exports = {
  name:'bal',
  description: 'gives the user their current balance',
  execute( message, args){

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')

    var searchUser = message.author.id
    const obj = {
      method: 'POST',
        headers:{ 
          'content-type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({searchUser})
      }
          
    fetch('http://localhost:3000/banks/search', obj)
      .then(resp => resp.json())
      .then(bank => {
        Display.setDescription(`Current Balance: ${bank[0].amount} tickets`)
        message.channel.send(Display)})
      .catch(err => console.warn(err))
  }
}
