function generateGuess(){
  return Math.round(Math.random() * 10)
}

const app = new Vue({
  el: "#app",
  data: {
    timer: 10,
    computerGuess: generateGuess(),
    userGues:0,
    errors: [ ],
    showModal:false,
    failure: false,
    success: false,
    customMessage: ''
  },
  methods: {
    enter: function(){
      if(app.computerGuess == app.userGues){
        alert('Your guess is correct ')
        this.computerGuess = generateGuess()
        console.log(app.computerGuess)
      }else{
        this.errors.push(true)
        if(this.errors.length >= 3){
          alert('You failed' + ''+this.computerGuess)
          this.timer = 10
          this.errors = []
          this.computerGuess = generateGuess()
          console.log(app.computerGuess)
        }
      }
    }
  }
})

function countDown() {
  app.timer--
  if(app.timer ===0){
    app.showModal = true
    app.failure = true
    app.success = false
    app.timer = 10
    app.customMessage = 'the correct values was ' + app.computerGuess
  }
}

setInterval(countDown, 1000)
console.log(app.computerGuess)