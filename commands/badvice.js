const fetch = require("node-fetch");

module.exports = {
  name:'badvice',
  description: 'gives good advice',
  execute( message, args){
    fetch('https://api.adviceslip.com/advice')
      .then(resp => resp.json())
      .then(advice => message.channel.send(advice.slip.advice))
  }
}