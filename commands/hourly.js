const talkedRecently = new Set();
const fetch = require("node-fetch");
module.exports = {
  name:'hourly',
  description: 'A kind Goodmorning',
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
        userBank.amount = userBank.amount + findAmount()
        updateUserBal()
      })
      .catch(err => console.warn(err))

    function findAmount(){
      var cash = Math.floor(Math.random() * 600) + 100
      message.channel.send("You Found $" + cash + " on the ground!!")
      return cash
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