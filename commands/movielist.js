const fetch = require("node-fetch");

module.exports = {
  name:'movielist',
  description: 'A tender goodnight',
  execute( message, args){
    fetch('http://localhost:3000/movies')
        .then(resp => resp.json())
        .then(movies => {
            var movieArr = []
            movies.forEach(movie => {
            var movieView = movie.name
                if(movie.watched){
                    movieView = '✅ ' + movieView + '\n'
                }else{
                  movieView = '⬛️ ' + movieView + '\n'
                }
                movieArr.push(movieView)
            })
            message.channel.send(movieArr.join(""))
        }) 
        .catch(err => console.warn(err))
  }
}