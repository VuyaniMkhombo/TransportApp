function generateGuess(){
  return Math.round(Math.random() * 10)
}

const app = new Vue({
  el: "#app",
  data: {
    timer: 60,
    computerGuess: generateGuess(),
    userGues:0,
    errors: [ true, true]
  },
  methods: {
    enter: function(){
      if(app.computerGuess == app.userGues){
        alert('Your guess is correct ')
      }else{
        alert('Sorry Wrong Guess Try Again!')
      }
    }
  }
})

function countDown() {
  app.timer--
  if(app.timer ===0){
    alert('You failed!')
    app.timer = 60
  }
}

setInterval(countDown, 1000)
console.log(app.computerGuess)