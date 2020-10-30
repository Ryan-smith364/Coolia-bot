const fetch = require("node-fetch");

module.exports = {
  name:'slots',
  description: 'A game of chance in order to win the community jackpot, everything lost from the other games',
  execute( message, args){
    var fruit = ['🍇', '🍋', '🍓', '🍒', '🍊', '🍉', '🍐', '⑦']
    var result = []
    var jackpot = ['⑦','⑦','⑦']
    var searchUser = message.author.id
    userBank = {}

    function roll() {
      for(var x = 0; x < 3; x++){
        result.push(fruit[Math.floor(Math.random() * fruit.length)])
      }
    }

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
        .then(bank => userBank = bank)
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

    roll()

    if(result === jackpot){
      userBank.amount = userBank.amount + 9999
      winJackpot()
      message.channel.send("Slots\n" + result.join("  ") + "\nYou Win The Jackpot!!!")
    } else{
      message.channel.send("Slots\n" + result.join("  ") )
    }
  }
}