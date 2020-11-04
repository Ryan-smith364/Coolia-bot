const Discord = require("discord.js");
const { Collection } = require("discord.js")

module.exports = {
  name:'ttt',
  description: 'play tic tak toe with a friend',
  execute( message, args){
    players = []
    players.push(message.author)
    players.push(message.mentions.users.first())  
    var currentPlayer = 0
    var winner = false
    var symbols = ['❌', '⭕']
    var board = ['\n', '🔵', '🔵', '🔵', '\n', '🔵', '🔵', '🔵', '\n', '🔵', '🔵', '🔵']
    var turns = 0
    var winConditions = [ [1, 2, 3], [5, 6, 7], [9, 10, 11], [1, 5, 9],  [2, 6, 10], [3, 7, 11], [1, 6, 11], [3, 6, 9]]

    function switchPlayers(){
      if(currentPlayer === 0){
        currentPlayer++
      }else{
        currentPlayer--
      }
    }

    function selectSpace(message){
      console.log(message.content)
      var space = parseInt(message.content)
      if(space > 0 && space < 10){
        if(space > 3 && space <= 6){
          space++
        } else if(space > 6) {
          space+=2
        }
        if(board[space] === '🔵'){
          board[space] = symbols[currentPlayer]
          turns++
        }else{
        message.reply('please choose an available space')
        }
      }else{
      message.reply('please select a number 1-9')
      }
    }

    function checkWin(){
      var ids = []
      for (var i = 0; i <= board.length -1; i++) {
        if ( board[i] === symbols[currentPlayer]) {
          ids.push(i)
        }
      }
      winConditions.forEach(condition =>{
        var allFounded = condition.every( ai => ids.includes(ai) )
        if(allFounded){
          winner = true
        }
      })
    }

    if(players[1] !== undefined && players[0].id !== players[1].id){
      message.channel.send("Please Select a Number Between 1-9")
      message.channel.send(board.join(' ')).then((msg)=> {
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === players[currentPlayer].id, { time: 120000 })
        collector.on('collect', message => {
          
            if (parseInt(message.content) > 0 && parseInt(message.content) < 10) {
              selectSpace(message)
              checkWin()
              if(winner){
                message.delete()
                collector.stop()
                msg.edit(board.join(' ')+ `\n <@${players[currentPlayer].id}> Wins!`)
              }else if(turns === 9){
                collector.stop()
                message.delete()
                if(winner === false){
                  msg.edit(board.join(' ')+ `\n It's a Tie`)
                }
              }else{
                switchPlayers()
                message.delete()
                msg.edit(board.join(' '))
              }
            }else if(message.content.toLowerCase() === "quit"){
              collector.stop()
            }
      })})
    }
  }
}
