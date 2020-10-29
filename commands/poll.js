module.exports = {
  name:'poll',
  description: 'creates a message √ / x reactions',
  execute( message, args){
    const pollContent = message.content.split(" ")
        pollContent.shift()
        const join = pollContent.join(" ")
       
        message.channel.send("Question:" + " " + join)
            .then(async function (message) {
                message.react('✅')
                message.react('❌')
            })
  }
}