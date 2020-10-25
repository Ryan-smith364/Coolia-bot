const fetch = require("node-fetch");

module.exports = {
  name:'compliment',
  description: 'compliment command',
  execute( message, args){


    console.log(message.mentions.users.first())
    fetch('https://complimentr.com/api')
        .then(resp => resp.json())
        .then(json => {if(message.mentions.users.first() === undefined){
          message.channel.send(`<@${message.author.id}> ` + json.compliment)
        }else{
          message.channel.send(`<@${message.mentions.users.first().id}> ` + json.compliment)
        }
  })}
}