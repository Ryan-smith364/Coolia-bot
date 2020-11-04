const Discord = require("discord.js")
const fetch = require("node-fetch");


module.exports = {
  name:'jackpot',
  description: 'Announces the current jackpot',
  execute( message, args){
    
    var searchUser = "123456781234567543"
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
        message.channel.send(`Current Jackpot Is $${bank[0].amount}.`)
      })
      .catch(err => console.warn(err))
        
  }
}