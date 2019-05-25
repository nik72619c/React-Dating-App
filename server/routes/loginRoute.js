const express=require('express');
const loginRoute=express.Router();
const loginOperations=require('../db/loginOperations');

loginRoute.post('/login',(request,response)=>{

    console.log('request.body inside of login API is', request.body);
    loginOperations.fetchUser(request.body.userObject,request,response);
});
 
loginRoute.post('/register',(request,response)=>{
    console.log('inside the register route...');
    loginOperations.registerUser(request,response);
});


module.exports=loginRoute;