const express=require('express');
const app=express();
require('dotenv').config();
const mongoose=require('./db/common/connection');
const bodyParser= require('body-parser');
const loginRoute=require('./routes/loginRoute');
const multipart= require('connect-multiparty');
const cloudinary=require('cloudinary');
cloudinary.config({
    cloud_name: 'nik72619c',
    api_key: '674746625412277',
    api_secret: 'TOfQvvSPM_PMXWY-NjeBrnhOHCg',
  });
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    console.log('inside the cors middleware');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

var port =process.env.PORT || 1234;
app.listen(port,()=>{

    process.stdout.write('server started on port '+port);
});
