const express=require('express');
const loginRoute=express.Router();
const loginOperations=require('../db/loginOperations');
const userOperations= require('../db/userOperations');


loginRoute.post('/login',(request,response)=>{

    console.log('request.body inside of login API is', request.body);
    loginOperations.fetchUser(request.body.userObject,request,response);
});
 
loginRoute.post('/register',(request,response)=>{
    console.log('inside the register route...');
    loginOperations.registerUser(request.body.userObject,request,response);
});

loginRoute.get('/getUsers', (request, response)=>{
    console.log('inside getusers route...');
    userOperations.getUsers(request, response);
});


module.exports=loginRoute;