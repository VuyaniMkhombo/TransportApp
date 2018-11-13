

const app = new Vue({
  el: "#app",
  data: {
    username:'',
    password:'',
    usernameError: false,
    passwordError: false,
    usernameErrorMessage: []
  },
  methods: {
    login: function(){
      this.passwordError = false
      this.usernameError = false
      this.usernameErrorMessage = []

      if(app.password.length < 6){
        app.passwordError = true
      }

      if(app.username.length < 3){
        app.usernameError = true
        app.usernameErrorMessage.push('Username is too short')

      }

      if(app.username.includes('@')){
        app.usernameError = true
        app.usernameErrorMessage.push('Username must be a valid email address')

      }

      

    }
  }
})
 
window.addEventListener('load', function() {

  var webAuth = new auth0.WebAuth({
    domain: 'vuyani.auth0.com',
    clientID: 'R8bFyqcGirC2tGoHBrRM0q3VEVPpOizg',
    responseType: 'token id_token',
    scope: 'openid',
    redirectUri: window.location.href
  });

  var loginBtn = document.getElementById('btn-login');

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

});

