const fetch = require("node-fetch");
module.exports = {
  name:'pay',
  description: 'gives money to mentioned user',
  execute( message, args){
    if(message.author.id === '432172127123144705'){
      var userBank = []
      var searchUser = message.mentions.users.first().id
      console.log(searchUser)

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
          userBank.amount = parseInt(userBank.amount) + parseInt(args[1])
          updateUserBal()
        })
        .catch(err => console.warn(err))

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