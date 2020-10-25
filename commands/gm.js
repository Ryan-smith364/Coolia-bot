module.exports = {
  name:'gm',
  description: 'A kind Goodmorning',
  execute( message, args){
    message.channel.send('Good Morning, I hope you have a wonderful day!');
  }
}