module.exports = {
  name:'slots',
  description: 'A game of chance in order to win the community jackpot, everything lost from the other games',
  execute( message, args){
    var fruit = ['🍇', '🍋', '🍓', '🍒', '🍊', '🍉', '🍐', '⑦']
    var result = []
    var jackpot = ['⑦','⑦','⑦']

    function roll() {
      for(var x = 0; x < 3; x++){
        result.push(fruit[Math.floor(Math.random() * fruit.length)])
      }
    }

    roll()
    if(result === jackpot){
      message.channel.send("Slots\n" + result.join("  ") + "\nYou Win The Jackpot!!!")
    } else{
      message.channel.send("Slots\n" + result.join("  ") )
    }
  }
}