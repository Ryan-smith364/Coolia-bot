module.exports = {
  name:'help',
  description: 'sends off command information',
  execute( message, args){
    message.channel.send("prefix is 'c!' \n\n General commands: \n gm: Sends a warm good morning for all to hear \n gn: A sweet goodnight message even to those night owls \n ping/beep: Both are basic commands for seeing if the bot is active \n help: You should know what it does, you're here \n poll (question): Ask a question for people to react y/n to \n muli (q1,q2,q3): Similar to the poll but allows for multiple choices(up to 10)\n\n Funny things: \n Joke: Sends a random joke, results may vary \n compliment @user: Sends a nice little message to a friend \n advice: Need some advice? give it a shot to see what you get \n\n Movie Night Things: \nfriday: Get an exact countdown until fridays movie \n movielist: Show off the movies we want to see \n addmovie: WIP \n watchedmovie: WIP")
  }
}