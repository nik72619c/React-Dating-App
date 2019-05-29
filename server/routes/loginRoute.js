const express=require('express');
const loginRoute=express.Router();
const loginOperations=require('../db/loginOperations');
const userOperations= require('../db/userOperations');
const sessionChecker=require('../utils/middleware/sessionChecker');

loginRoute.post('/login',(request,response)=>{

    console.log('request.body inside of login API is', request.body);
    loginOperations.fetchUser(request.body.userObject,request,response);
});
 
loginRoute.post('/register',(request,response)=>{
    console.log('inside the register route...');
    loginOperations.registerUser(request.body.userObject,request,response);
});

loginRoute.get('/getUsers',sessionChecker, (request, response)=>{
    console.log('inside getusers route...');
    userOperations.getUsers(request, response);
});

loginRoute.post('/like', (request, response)=>{
    console.log('inside /like route');
    console.log('request.body obtained', request.body);
    userOperations.likeUser(request, response);
});

loginRoute.post('/superlike', (request, response)=>{
    console.log('inside /superlike route');
    console.log('request.body obtained', request.body);
    userOperations.superlikeUser(request, response);
});

loginRoute.post('/block', (request, response)=>{
    console.log('inside /block route');
    console.log('request.body obtained', request.body);
    userOperations.blockUser(request, response);
});

module.exports=loginRoute;