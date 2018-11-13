

const app = new Vue({
  el: "#app",
  data: {
    username:'',
    password:'',
    usernameError: false,
    passwordError: false,
    usernameErrorMessage: ''
  },
  methods: {
    login: function(){
      this.passwordError = false
      this.usernameError = false
      this.usernameErrorMessage = ''

      if(app.password.length < 6){
        app.passwordError = true
      }

      if(app.username.length < 3){
        app.usernameError = true
        app.usernameErrorMessage = 'Username is too short'

      }

      if(app.username.includes('@')){
        app.usernameError = true
        app.usernameErrorMessage = 'Username must be a valid email address'

      }

      

    }
  }
})
  

