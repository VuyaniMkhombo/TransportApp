//Progressive Web App

//Regster the Service Worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service_worker.js', {scope: './'}).then(function(registration){
        console.log('Seervice Worker registrayion successful:', registration);
    }, function(error){
        console.log('Registration failed:', error);
    });
};

//VUE-Framework
var app = new Vue({
    el: '#app',
    data:{

    },
    methods: {
        login: function(){
            window.location.href="searchRoutes.html";
            //loadMap();
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