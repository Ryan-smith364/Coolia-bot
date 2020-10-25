const fetch = require("node-fetch");

module.exports = {
  name:'advice',
  description: 'advice command',
  execute( message, args){


    fetch('https://badadvice.rest/api/random')
      .then(resp => resp.json())
      .then(advice => message.channel.send(advice)) 
  }
}