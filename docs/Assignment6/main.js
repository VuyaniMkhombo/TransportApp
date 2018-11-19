//Progressive Web App

//Regster the Service Worker
//if('serviceWorker' in navigator){
  //  navigator.serviceWorker.register('/service_worker.js', {scope: './'}).then(function(registration){
    //    console.log('Seervice Worker registrayion successful:', registration);
   // }, function(error){
       // console.log('Registration failed:', error);
   // });
//};

//VUE-Framework
var app = new Vue({
    el: '#app',
    data:{
        username:'',
        password :'',
        usernameError:false,
        passwordError:false,
        usernameErrorMessage:[],
        passwordErrorMessage:[]
    },
    methods: {
        validate: function () {
            this.passwordError=false 
            this.usernameError=false
            this.usernameErrorMessage=[],
            this.passwordErrorMessage=[]

            if(this.password.length < 6){
                this.passwordError=true
                this.passwordErrorMessage.push({msg:'Password is too short', date:Date.now()})
            }
            
            if(this.username.length < 3){
                this.usernameError=true
                this.usernameErrorMessage.push({msg:'Username is too short', date:Date.now()})
                
            }
            
            if(!(this.username.includes('@'))){
                this.usernameError=true
                this.usernameErrorMessage.push({msg:'Username must include @', date:Date.now()})
                
            }
            if(!this.usernameError && !this.passwordError){
                window.location.href="register.html";
                console.log("mapPage"); 
            }
        },

        login: function(){
            window.location.href="register.html";
            //loadMap();
        }
    }
    
    
})
//Auth0 code
//window.addEventListener('load', function() {
//
//    var webAuth = new auth0.WebAuth({
//      domain: 'vuyani.auth0.com',
//      clientID: 'R8bFyqcGirC2tGoHBrRM0q3VEVPpOizg',
//      responseType: 'token id_token',
//      scope: 'openid',
//      redirectUri: window.location.href
//    });
//  
//    var loginBtn = document.getElementById('btn-login');
//  
//    loginBtn.addEventListener('click', function(e) {
//      e.preventDefault();
//      webAuth.authorize();
//    });
//  
//  });

  