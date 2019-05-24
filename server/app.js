const express=require('express');
const app=express();
const mongoose=require('./db/common/connection');
// const cors=require('./utils/middlewares/cors');
const cors=require('cors');
const multer=require('multer');
const dotenv=require('dotenv');
const cloudinary=require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
const bodyParser= require('body-parser');
const loginRoute=require('./routes/loginRoute');
dotenv.config();
// const adminRoute=require('./routes/adminroutes');
// const productRoute=require('./routes/productroutes');
// const session=require('express-session');

app.use('/api',loginRoute);

var port =process.env.PORT || 1234;
app.listen(port,()=>{

    process.stdout.write('server started on port '+port);
});
