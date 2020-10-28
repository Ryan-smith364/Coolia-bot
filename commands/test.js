const Discord = require("discord.js")

module.exports = {
  name:'test',
  description: 'A Test',
  execute( message, args){
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
              weight = 11
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

     createDeck()
     startRound()

     function botLogic(){
       while(players[1].total < players[0].total){
         hit(1)
       }
     }


     message.author.send("BlackJack\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + players[1].hand[0].value + players[1].hand[0].suit + ' ??' + '\nDealer Total: ' + players[1].hand[0].weight)
      .then((msg)=> {
      
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 50000 });
           collector.on('collect', message => {
              if (message.content === "hit") {
                if(players[currentPlayer].total < 21){
                  hit()
                  msg.edit("BlackJack\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + players[1].hand[0].value + players[1].hand[0].suit + ' ??' + '\nDealer Total: ' + players[1].hand[0].weight)
                }
                if(players[currentPlayer].total > 21){
                  msg.edit("BlackJack YOU LOSE\nHand:" + displayHand(0) + "\nTotal: Busted" + '\n\nDealer: ' + players[1].hand[0].value + players[1].hand[0].suit + ' ??' + '\nDealer Total: ' + players[1].hand[0].weight)
                }else if(players[currentPlayer].total === 21){
                  currentPlayer++
                  botLogic()
                  msg.edit("BlackJack\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(0) + '\nDealer Total: ' + players[1].total)
                  if(players[1].total > 21){
                    msg.edit("BlackJack YOU WIN\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(0) + '\nDealer Total: ' + players[1].total)

                  }else {
                    msg.edit("BlackJack YOU LOSE\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(0) + '\nDealer Total: ' + players[1].total)
                  }
                }
                
              } else if (message.content === "stand") {
                currentPlayer++
                botLogic()
                msg.edit("BlackJack\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(0) + '\nDealer Total: ' + players[1].total)
                if(players[1].total > 21){
                  msg.edit("BlackJack YOU WIN\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(0) + '\nDealer Total: ' + players[1].total)
                }else {
                  msg.edit("BlackJack YOU LOSE\nHand:" + displayHand(0) + "\nTotal: " + players[0].total + '\n\nDealer: ' + displayHand(0) + '\nDealer Total: ' + players[1].total)
                }

              }
   
             }
         )
        
      })
  }
}