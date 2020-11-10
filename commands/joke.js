const fetch = require("node-fetch");
const Discord = require("discord.js")

module.exports = {
  name:'joke',
  description: 'retreives a ranndom but more appropriate joke',
  execute( message, args){

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')
    
    fetch('https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=racist,sexist,nsfw')
    .then(resp => resp.json())
    .then(joke => { 
      console.log(joke)
      if(joke.type === 'single'){
        Display.setDescription(joke.joke)
        message.channel.send(Display)
      }
      else{
        Display.setDescription(joke.setup)
        message.channel.send(Display)
        .then((msg)=> {
          setTimeout(function(){
            Display.setDescription(joke.setup + '\n' + joke.delivery)
            msg.edit(Display)
          }, 2000)
        })
      }
    }) 
  }
}