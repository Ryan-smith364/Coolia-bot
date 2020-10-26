const fetch = require("node-fetch");

module.exports = {
  name:'joke',
  description: 'joke command',
  execute( message, args){


    fetch('https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=racist,sexist,nsfw')
    .then(resp => resp.json())
    .then(joke => { 
      console.log(joke)
      if(joke.type === 'single'){
        message.channel.send(joke.joke)
      }
      else{
        message.channel.send(joke.setup)
        .then((msg)=> {
          setTimeout(function(){
            msg.edit(joke.setup + '\n' + joke.delivery);
          }, 2000)
        })
      }
    }) 
  }
}