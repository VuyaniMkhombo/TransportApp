var app = new Vue({
    el: '#app',
    data:{
        guess:0,
        estimate:0
    },
    methods: {
        showAlert: function () {
            if(app.guess == app.estimate){
                alert('Your guess is correct ')
            }else{
                alert('Sorry Wrong Guess Try Again!')
            }
          
        }
      }
})

app.guess = Math.round(Math.random() * 10)

console.log(app.guess)<button v-on:click="showAlert">submit</button>