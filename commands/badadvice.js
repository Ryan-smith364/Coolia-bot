const fetch = require("node-fetch");
const advice = require("./advice");

module.exports = {
  name:'badadvice',
  description: 'gives good advice',
  execute( message, args){
    fetch('https://api.adviceslip.com/advice')
      .then(resp => resp.json())
      .then(advice => message.channel.send(advice.slip.advice))
  }
}