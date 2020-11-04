const Discord = require("discord.js")
const fetch = require("node-fetch");



module.exports = {
  name:'test',
  description: 'A Test',
  cooldown: 5,
  execute( message, args){
    players = []
    players.push(message.author)
    players.push(message.mentions.users.first())  

    var currentPlayer = 0

    function switchPlayer(){
      if(currentPlayer === 0){
        currentPlayer++
      }else{
        currentPlayer--
      }
    }

    message.channel.send("This is a test").then((msg)=> {
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === players[currentPlayer].id, { time: 120000 });
      collector.on('collect', message => {
      if (message.content.toLowerCase() === "switch") {
        switchPlayer()
        msg.edit("This is a test: Switched")
      } else if (message.content.toLowerCase() === "test") {
        msg.edit("This is a test: And it works")
      }
    })})
  }
}