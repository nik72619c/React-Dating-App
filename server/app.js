const express=require('express');
const app=express();
require('dotenv').config();
const userOperations=require('./db/userOperations');
const mongoose=require('./db/common/connection');
const bodyParser= require('body-parser');
const loginRoute=require('./routes/loginRoute');
const multipart= require('connect-multiparty');
const cloudinary=require('cloudinary');
const http=require('http').Server(app);
const io=require('socket.io')(http);
cloudinary.config({
    cloud_name: 'nik72619c',
    api_key: '674746625412277',
    api_secret: 'TOfQvvSPM_PMXWY-NjeBrnhOHCg',
  });
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    console.log('inside the cors middleware');
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, authorization, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials','true');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Cache-Control", "no-cache");
    next();
});

const multipartMiddleware = multipart();
app.post('/upload', multipartMiddleware, (req, res) => {
    // Upload image
    cloudinary.v2.uploader.upload(req.files.image.path, {}, function(
      error,
      result
    ) {
      if (error) {
        console.log('error saving image..',error);
        return res.status(500).send(error);
      }
      // Save image to database
        console.log('image saved to cloudinary', result);
        res.json({
            message: result,
            status: 200
        })
    });
  });
app.use('/api',loginRoute);
//code for listening and acting to sockets
let connected=module.exports.connected=[];
var found=false;
io.on('connection',(socket)=>{
  console.log('user connected...');
  socket.emit('connection');
  socket.on('login', (payload)=>{
    console.log('data received on login ...',payload);
    //push this data in connected users
    connected.push(payload);
    console.log('connected in login event on server', connected);
  });
  socket.on('like', (userObject)=>{
    console.log('inside like socket event at the server and userObject is', userObject);
    userOperations.likeUser(userObject,()=>{
      //write the notif callback logic for sending
      let socketid;
      console.log('connected array is', connected);
      for(let i=0;i<connected.length;i++){
        console.log('connected email '+ connected[i].email +' and userObject email '+ userObject.targetEmail);
        if(connected[i].email==userObject.targetEmail){
          console.log('inside if.. and socketid is', connected[i].socketid);
          socket=connected[i].socketid;
          console.log('running cb and socketid is', socketid);
          io.to(connected[i].socketid).emit('sendLike',{
            message: 'you were liked by '+userObject.email
          });
        }
      }

    });
  })
  //io logic for superlike
  socket.on('superlike',(userObject)=>{
    console.log('inside like socket event at the server and userObject is', userObject);
    userOperations.superlikeUser(userObject,(userData)=>{
      //write the notif callback logic for sending
      console.log('superlikeUser done and data received is ', userData);
      let socketid;
      console.log('connected array is', connected);
      for(let i=0;i<connected.length;i++){
        console.log('connected email '+ connected[i].email +' and userObject email '+ userObject.targetEmail);
        if(connected[i].email==userObject.targetEmail){
          console.log('inside if.. and socketid is', connected[i].socketid);
          socket=connected[i].socketid;
          console.log('running cb and socketid is', socketid);
          io.to(connected[i].socketid).emit('sendSuperlike',{
            message: 'you were superliked by '+userObject.email,
            url: userData.profile_image_url
          });
        }
      }

    });
  })
  //logic for block user
  socket.on('block', (userObject)=>{
    console.log('inside like socket event at the server and userObject is', userObject);
    userOperations.blockUser(userObject,()=>{
      //write the notif callback logic for sending
      let socketid;
      console.log('connected array is', connected);
      for(let i=0;i<connected.length;i++){
        console.log('connected email '+ connected[i].email +' and userObject email '+ userObject.targetEmail);
        if(connected[i].email==userObject.email){
          console.log('inside if.. and socketid is', connected[i].socketid);
          socket=connected[i].socketid;
          console.log('running cb and socketid is', connected[i].socketid);
          io.to(connected[i].socketid).emit('sendBlock',{
            message: 'you were blocked by '+userObject.email,
            blockedEmail: userObject.targetEmail
          });
          console.log('after sending sendBlock..');
        }
      }

    });
  })
});
var port =process.env.PORT || 1234;
http.listen(port,()=>{
    process.stdout.write('server started on port '+port);
}); 
