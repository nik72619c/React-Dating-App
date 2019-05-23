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
dotenv.config();
// const adminRoute=require('./routes/adminroutes');
// const productRoute=require('./routes/productroutes');
// const session=require('express-session');
const config=require('./db/common/config');
const storageCloud = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "upload",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
    });

const parser = multer({ storage: storageCloud });
const storage = multer.diskStorage({
    destination  : './public/uploads/',
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname));
    }
})

cloudinary.config({
    cloud_name: 'nik72619c',
    api_key: '674746625412277',
    api_secret: 'TOfQvvSPM_PMXWY-NjeBrnhOHCg'
    });

const upload =multer({
    storage : storage,
    limits : {fileSize : 100000},
    fileFilter : function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('Image');
function checkFileType(file,cb){
    const filetypes=/jpeg|jpg|png|gif/;
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype= filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb('Error : Image Only')
    }
}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.get('/', (request, response)=>{

// response.send('node backend works');

// });

app.use(cors({

    origin: 'http://localhost:3000',
    credentials: true
}));
// app.use('/',adminRoute);
// app.use('products',productRoute);


var port =process.env.PORT || 1234;
app.listen(port,()=>{

    process.stdout.write('server started on port '+port);
});
