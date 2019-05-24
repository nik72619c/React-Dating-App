const express=require('express');
const loginRoute=express.Router();
const loginOperations=require('../db/operations/loginOperations');

loginRoute.post('/login',(request,response)=>{

    console.log('request.body inside of login API is', request.body);
    loginOperations.fetchUser(request.body.userObject,request,response);
});

// loginRoute.get('/loginWithFacebook',(request,response)=>{
//     console.log('inside passport req..');
// passport.authenticate('facebook');
// });

// loginRoute.get('/auth/facebook/callback',(request,response)=>{
//     passport.authenticate('facebook', function (err,user,info){
//         console.log('err',err);
//         console.log('user',user);
//         console.log('info', info);
//     });

//     response.send('auth done successfully by fb !');
// });

// loginRoute.get('/api/loginWithFacebook',
//   passport.authenticate('facebook'));
//   loginRoute.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/api/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     console.log('successful authentication');
//     res.redirect('/api/login');
//   });

loginRoute.post('/register',(request,response)=>{

    console.log('request.body inside of register API is', request.body);
    loginOperations.registerUser(request.body.userObject,request,response);
});

loginRoute.post('/forgotPassword',(request,response)=>{
    //route to chsnge password !
    //call loginOperations forgot password function
});

module.exports=loginRoute;