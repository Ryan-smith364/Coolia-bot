const Discord = require('discord.js');
module.exports = {
  name:'example',
  description: 'p.o.c',
  execute( message, args){

    console.log(message)

    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Blackjack')
      .setURL('https://www.youtube.com/watch?v=dfwILKsb7J4')
      .setThumbnail()
      .addFields(
        { name: 'Hand:', value: displayHand(0) },
        { name: 'Total:', value: total(0) },
        { name: '\u200B', value: '\u200B' },
        { name: 'Dealer:', value: displayHand(1) },
        { name: 'DTotal:', value: total(1) },
      )
      .setTimestamp()

    message.channel.send(exampleEmbed).then((msg)=> {
      setTimeout(function(){
        exampleEmbed.setTitle('with hookers')
        msg.edit(exampleEmbed)
      }, 2000)
    })

  }
}
