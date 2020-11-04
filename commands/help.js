const Discord = require("discord.js")

module.exports = {
  name:'help',
  description: 'sends off command information',
  execute( message, args){

    const helpDisplay = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help')
    .setURL('https://youtu.be/2Q_ZzBGPdqE')
    .setDescription("please enter one of the following for more info:\n \t -Gen\n \t -Fun\n \t -Fri\n \t -Gamble")
    .setTimestamp()
    
    message.channel.send(helpDisplay).then((msg)=> {
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 120000 })
      collector.on('collect', message => {
        if (message.content.toLowerCase() === "gen") {
          helpDisplay.setTitle("Help - General")
          helpDisplay.setDescription("gm/gn: Send nice messages for morning or night\n\n multi {op1,op2,op3}: send a multiple choice question with up to 10 options\n\n poll {question}: Sends your question with reactions for people to vote on\n\n test: this is where i try my new features feel free to check in")
          msg.edit(helpDisplay)
          console.log("gen")  
        } else if (message.content.toLowerCase() === "fun") {
          helpDisplay.setTitle("Help - Fun an Games")
          helpDisplay.setDescription("advice/badvice: Gives you some advice good? Bad? Who knows\n\n compliment {@user}: Send a nice message to a friend\n\n joke: Sends a random joke\n\n ")
          msg.edit(helpDisplay)
          console.log("fun")
        } else if (message.content.toLowerCase() === "fri") {
          helpDisplay.setTitle("Help - Friday/Movies")
          helpDisplay.setDescription("Mostly A Work In Progress:\n friday: Gives the time until movie nigh\n\n Movielist: sends out the movies we need to watch")
          msg.edit(helpDisplay)
          console.log("fri")
        } else if (message.content.toLowerCase() === "gamble") {
          helpDisplay.setTitle("Help - Gambling")
          helpDisplay.setDescription("bal: Tells you your current account balance\n\n bj {ammount}: Play a round of blackjack against our bot, bet high win large but all thats lost enters the jackpot\n\n jackpot: gives you the current jackpot total\n\n slots: get a chance to get some winnings from the jackpot, tripple 7's to win it all\n\n hourly: Gives you a random amount of money 100-600")
          msg.edit(helpDisplay)
          console.log("gamble")
        } else if (message.content.toLowerCase() === "stop") {
          collector.stop()
        }else {
          helpDisplay.setTitle("Help")
          helpDisplay.setDescription("please enter one of the following for more info:\n \t * Gen\n \t * Fun\n \t * Fri\n \t * Gamble\n\n And Say 'stop' to prevent help message from changing")
          msg.edit(helpDisplay)
          console.log("Help Instructions")
        }
      })
    })
  }
}