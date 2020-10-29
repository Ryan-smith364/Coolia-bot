const fetch = require("node-fetch");

module.exports = {
  name:'bad',
  description: 'joke command but has a chance to be bad',
  execute( message, args){


    fetch('https://sv443.net/jokeapi/v2/joke/Any')
    .then(resp => resp.json())
    .then(joke => { 
      console.log(joke)
      if(joke.type === 'single'){
        message.channel.send('||' + joke.joke + '||' )
      }
      else{
        message.channel.send('||' + joke.setup + '||' )
        .then((msg)=> {
          setTimeout(function(){
            msg.edit('||' + joke.setup + '\n' + joke.delivery + '||');
          }, 2000)
        })
      }
    }) 
  }
}