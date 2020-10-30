const Discord = require("discord.js")
const fetch = require("node-fetch");

module.exports = {
  name:'bj',
  description: 'commands, with blackjack and hookers',
  execute( message, args){
    console.log(args)
    var bet = parseInt(args[0])
    var userBank = {}

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
        bal = bank[0].amount
        round()
      })
      .catch(err => console.warn(err))


    var suits = ['♠','♥','♦','♣']
    var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    var deck = new Array();

    var currentPlayer = 0
    var players = [
      {
        name: 'player',
        hand: [],
        total: 0
      },
      {
        name: 'dealer',
        hand: [],
        total: 0
      }
    ]

    function createDeck(){
      deck = new Array();
        for (var i = 0 ; i < values.length; i++){
          for(var x = 0; x < suits.length; x++){
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" ||       values[i] == "K")
              weight = 10
            if (values[i] == "A")
              weight = 1
              var card = { value: values[i], suit: suits[x],weight: weight }
              deck.push(card)
          }
        }
    }
   
    function hit(){
      var number = Math.floor(Math.random() *deck.length)
      players[currentPlayer].hand.push(deck[number])
      deck.splice(number, 1)
      total(currentPlayer)
    }

    function total(player){
      var handTotal = 0
      players[player].hand.forEach(card => {
        handTotal = handTotal + card.weight
      })
      
      var aces = players[player].hand.filter(card => card.value === 'A').length
      console.log("Busted", aces)
      if (aces > 0) {
        for(var x = 0; x < aces; x++){
         if(handTotal + 10 <= 21){
            handTotal = handTotal + 10
         }
        }
      }
      
      players[player].total = handTotal
    }

    function displayHand(player){
      var cards = []
      players[player].hand.forEach(card => {
        var display = card.value + card.suit
        cards.push(display)
      })
      return cards.join(' ')
    }

    function startRound(){
      for(var i = 0; i < 2; i++){
        for (var x = 0; x < players.length; x++){
          var number = Math.floor(Math.random() *deck.length)
          players[x].hand.push(deck[number])
          deck.splice(number, 1)
          total(x)  
        }
        
      }
      console.log(players)
    }

    function updateUserBal(won){
      if(won){
        userBank.amount = parseInt(userBank.amount) + bet
      } else{
        userBank.amount = parseInt(userBank.amount) - bet
      }
      userBank.amount = userBank.amount.toString()
      var searchUser = message.author.id
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

   function round(){
     if(parseInt(userBank.amount) >= bet){
       
       createDeck()
       startRound()
       
       const bjDisplay = new Discord.MessageEmbed()
       .setColor('#0099ff')
       .setTitle('Blackjack')
       .setURL('https://www.youtube.com/watch?v=dfwILKsb7J4')
       .addFields(
         { name: 'Hand:  ' + displayHand(0) ,value: 'Total: ' + players[0].total},
         { name: '\u200B', value: '\u200B' },
         { name: 'Dealer:  ' + players[1].hand[0].value + players[1].hand[0].suit + ' ???' ,value: 'Total: ' + players[1].hand[0].weight},
       )
       .setTimestamp()
       bjDisplay.color = 0x7289da;
   
         function editDisplay() {
           bjDisplay.fields = []
           bjDisplay.addFields(
             { name: 'Hand:  ' + displayHand(0) ,value: 'Total: ' + players[0].total},
             { name: '\u200B', value: '\u200B' },
             { name: 'Dealer:  ' + players[1].hand[0].value + players[1].hand[0].suit + ' ???' ,value: 'Total: ' + players[1].hand[0].weight},
           )
         }
   
         function botLogic(){
           while(players[1].total < players[0].total){
             hit(1)
           }
           bjDisplay.fields = []
           bjDisplay.addFields(
             { name: 'Hand:  ' + displayHand(0) ,value: 'Total: ' + players[0].total},
             { name: '\u200B', value: '\u200B' },
             { name: 'Dealer:  ' + displayHand(1) ,value: 'Total: ' + players[1].total},
           )
         }
         
         message.channel.send(bjDisplay)
         .then((msg)=> {
           
           const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 50000 });
           collector.on('collect', message => {
              if (message.content.toLowerCase() === "hit") {
                if(players[currentPlayer].total < 21){
                  hit()
                  editDisplay()
                  msg.edit(bjDisplay)
                }
                if(players[currentPlayer].total > 21){
                  bjDisplay.setDescription('You lose!')
                  editDisplay()
                  msg.edit(bjDisplay)
                  updateUserBal(false)
                }else if(players[currentPlayer].total === 21){
                  collector.stop()
                  currentPlayer++
                  botLogic()
                  if(players[1].total > 21){
                    bjDisplay.setDescription('You Win!')
                    editDisplay()
                    msg.edit(bjDisplay)
                    updateUserBal(true)
                  }else if(players[0].total === players[1].total){
                    bjDisplay.setDescription('Tie')
                    editDisplay()
                    msg.edit(bjDisplay)
                  }else{
                    bjDisplay.setDescription('You Lose')
                    editDisplay()
                    msg.edit(bjDisplay)
                    updateUserBal(false)
                  }
                }
                } else if (message.content.toLowerCase() === "stand") {
                  collector.stop()
                  currentPlayer++
                  botLogic()
                if(players[1].total > 21){
                  bjDisplay.setDescription('You Win!')
                  msg.edit(bjDisplay)
                  updateUserBal(true)
                }else if(players[0].total === players[1].total){
                  bjDisplay.setDescription('Tie')
                  msg.edit(bjDisplay)
                }else{
                  bjDisplay.setDescription('You Lose')
                  msg.edit(bjDisplay)
                  updateUserBal(false)
                }
              }
            }
        )})}else{
          message.channel.send("You Dont Have Enough To Bet That or you must place  Bet value")
      }
    }
   }
}
