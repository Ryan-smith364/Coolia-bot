const fetch = require("node-fetch");

module.exports = {
  name:'bal',
  description: 'gives the user their current balance',
  execute( message, args){
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
      .then(bank => message.channel.send('Current Balance: $' + bank[0].amount))
      .catch(err => console.warn(err))
  }
}
