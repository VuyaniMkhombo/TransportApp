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
            }
          
        }
      }
})

app.guess = Math.round(Math.random() * 10)

console.log(app.guess)