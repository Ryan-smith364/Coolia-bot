const fetch = require("node-fetch");

module.exports = {
  name:'joke',
  description: 'joke command',
  execute( message, args){


    fetch('https://sv443.net/jokeapi/v2/joke/Any')
    .then(resp => resp.json())
    .then(joke => { message.channel.send(joke.setup)
      .then((msg)=> {
        setTimeout(function(){
          msg.edit(joke.setup + '\n' + joke.delivery);
        }, 2000)
      })
    }) 
  }
}