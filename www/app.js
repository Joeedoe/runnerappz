//GLOBAL VARIABLE
auth = firebase.auth();
db = firebase.firestore();

userdata = {};

//on ready document
$(document).ready(function(){
    checkAuth();
});

//check user session
function checkAuth(){
    auth.onAuthStateChanged(function(authUser){
        if(authUser){
            userdata = authUser;
            pushPage('home');
        }
        else{
            userdata = {};
            pushPage('intro');
        }
    });
}

//push page to top
function pushPage(page){
    document.querySelector('#mainView').pushPage(page+'.html');
}

//user login
function login(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(username, password)
        .then(function(user) {
            checkAuth();
        }, function(error) {
            console.log(error);
        });
}

//user logout
function logout(){
    auth.signOut()
        .then(function(){
            checkAuth();
        }, function(error){
            console.log(error);
        });
}