module.exports = {
  name:'multi',
  description: 'creates a multiple choice reaction based question',
  execute( message, args){
  const multiContent = message.content.split(" ")
          multiContent.shift()
          const options = multiContent[0].split(",")
          const finalText = []
          var count = 1
          options.forEach(option => {
              var line = count + '. ' + options[count - 1] + '\n'
              finalText.push(line)
              count++
          });
          const numbers = [ "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
          if(finalText.length <= 10){
              message.channel.send("Question: \n" + 
                                  "__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_--__\n"  +
                                  finalText.join("") +
                                  "__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_--__\n"
                                  ).then(async function (message) {
                                      var check = 0
                                      while(check < finalText.length){
                                          message.react(numbers[check])
                                          check++
                                      }
                                  })
          }else{
                    message.channel.send("Wrong Structure #####")
                    .then(msg => {
                      msg.delete(1000)
                    })
          }  
      }
  }



  //     const multiContent = message.content.split(" ")
    //     multiContent.shift()
    //     const options = multiContent[0].split("/")
    //     const finalText = []
    //     var count = 1
    //     options.forEach(option => {
    //         var line = count + '. ' + options[count - 1] + '\n'
    //         finalText.push(line)
    //         count++
    //     });
    //     const numbers = [ "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
    //     if(finalText.length <= 10){
    //         message.channel.send("Question: \n" + 
    //                             "__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_--__\n"  +
    //                             finalText.join("") +
    //                             "__-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_--__\n"
    //                             ).then(async function (message) {
    //                                 var check = 0
    //                                 while(check < finalText.length){
    //                                     message.react(numbers[check])
    //                                     check++
    //                                 }
    //                             })
    //     }else{
    //         message.channel.send("Wrong Structure #####")
    //     }