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
                window.location.href="searchRoutes.html";
                console.log("mapPage"); 
            }
        },

        login: function(){
            window.location.href="searchRoutes.html";
            //loadMap();
        }
    }
    
    
})