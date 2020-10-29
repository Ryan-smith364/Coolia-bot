const Discord = require("discord.js")
const fetch = require("node-fetch");

module.exports = {
  name:'bj',
  description: 'commands, with blackjack and hookers',
  execute( message, args){
    console.log(args)
    var bet = parseInt(args[0])
    var userBank = {}
    var balance = 0

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
         if(handTotal + 10 < 21){
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

    
    function botLogic(){
      while(players[1].total < players[0].total){
        hit(1)
      }
    }

    function updateUserBal(won){
      if(won){
        userBank.amount = userBank.amount + bet
      } else{
        userBank.amount = userBank.amount - bet
      }
  
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
  
  if(balance <= bet){
    
    createDeck()
    startRound()

      message.channel.send("BlackJack\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + players[1].hand[0].value + players[1].hand[0].suit + ' ??' + '\nDealer Total: ' + players[1].hand[0].weight)
        .then((msg)=> {
        
          const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 50000 });
            collector.on('collect', message => {
                if(total(currentPlayer) === 21){
                  collector.stop()
                  currentPlayer++
                  botLogic()
                }
                else if (message.content.toLowerCase() === "hit") {
                  if(players[currentPlayer].total < 21){
                    hit()
                    msg.edit("BlackJack\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + players[1].hand[0].value + players[1].hand[0].suit + ' ??' + '\nDealer Total: ' + players[1].hand[0].weight)
                  }
                  if(players[currentPlayer].total > 21){
                    msg.edit("BlackJack YOU LOSE\nHand:" + displayHand(0) + "\nTotal: Busted" + '\n\nDealer: ' + players[1].hand[0].value + players[1].hand[0].suit + ' ??' + '\nDealer Total: ' + players[1].hand[0].weight)
                    updateUserBal(false)
                  }else if(players[currentPlayer].total === 21){
                    collector.stop()
                    currentPlayer++
                    botLogic()
                    msg.edit("BlackJack\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(1) + '\nDealer Total: ' + players[1].total)
                  if(players[1].total > 21){
                    msg.edit("BlackJack YOU WIN\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(1) + '\nDealer Total: ' + players[1].total)
                    updateUserBal(true)
                  }else if(players[0].total === players[1].total){
                    msg.edit("BlackJack TIE\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(1) + '\nDealer Total: ' + players[1].total)
                  }else{
                    msg.edit("BlackJack YOU LOSE\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(1) + '\nDealer Total: ' + players[1].total)
                    updateUserBal(false)
                  }
                  }
                
                } else if (message.content.toLowerCase() === "stand") {
                  collector.stop()
                  currentPlayer++
                  botLogic()
                  msg.edit("BlackJack\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(1) + '\nDealer Total: ' + players[1].total)
                  if(players[1].total > 21){
                    msg.edit("BlackJack YOU WIN\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(1) + '\nDealer Total: ' + players[1].total)
                    updateUserBal(true)
                  }else if(players[0].total === players[1].total){
                    msg.edit("BlackJack TIE\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(1) + '\nDealer Total: ' + players[1].total)
                  }else{
                    msg.edit("BlackJack YOU LOSE\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(1) + '\nDealer Total: ' + players[1].total)
                    updateUserBal(false)

                  }

                }
    
              }
          )
          
        })
    }else{
      message.channel.send("You Dont Have Enough To Bet That or you must place  Bet value")
    }
  }
}
