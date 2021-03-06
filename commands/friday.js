const Discord = require("discord.js");

module.exports = {
  name:'friday',
  description: 'gives an count down to movie night',
  execute( message, args){
    
    function timeDifference() {
      var today = new Date()
      const difference = findNextFriday() - today
      var remaining = "The Time Is Now!!!"

      if (difference > 0) {
        const parts = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
        remaining = Object.keys(parts).map(part => {
        return `${parts[part]} ${part}`
        }).join(" ")
      }
      return "Time until Movie Night: " + remaining
    }

    function findNextFriday() { 
      var d = new Date();
      d.setDate(d.getDate() + (5 + 7 - d.getDay()) % 7);
      d.setHours(22);
      d.setMinutes(0)
      d.setSeconds(0)
      return d;
    } 

    const Display = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription(timeDifference())


    message.channel.send(Display)

  }
}
