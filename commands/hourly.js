const talkedRecently = new Set();
const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name:'hourly',
  description: 'is the basic way to get money for gammbling',
  execute( message, args){


    if (talkedRecently.has(message.author.id)) {
      message.reply("Wait one hour before getting typing this again.");
    } else {
      talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 3600000);

      var userBank = []
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
        userBank = bank[0]
        var newval = parseInt(userBank.amount) + findAmount()
        userBank.amount = newval.toString()
        updateUserBal()
      })
      .catch(err => console.warn(err))

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription("Get some rest champ you've earned it")

    function findAmount(){
      var tokens = Math.floor(Math.random() * 48) + 2
      outcomes = [`you robbed ${tokens} from some random kid`, `You Found ${tokens} tokens on the ground. Score!`, `You see ${tokens} tokens on the ground. Might as well...`, `nothing says well earned tokens like theft. \n +${tokens} tokens`,]
      Display.setDescription(outcomes[Math.floor(Math.random() * outcomes.length)])
      message.channel.send(Display)
      return tokens
    }

    
    function updateUserBal(){
      const obj = {
        method: 'PATCH',
          headers:{ 
            'content-type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({userBank})
        }
            
      fetch(`http://localhost:3000/banks/${userBank.id}`, obj)
        .then(resp => resp.json())
        .then(bank => console.log(bank))
        .catch(err => console.warn(err))
    }

    }

  
  }
}