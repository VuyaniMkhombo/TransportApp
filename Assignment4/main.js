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