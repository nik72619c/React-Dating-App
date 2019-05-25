const express=require('express');
const app=express();
const mongoose=require('./db/common/connection');
const bodyParser= require('body-parser');
const loginRoute=require('./routes/loginRoute');
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
app.get('/',(request,response)=>{
    response.json({
        message: 'backend working properly'
    })
})
app.use('/api',loginRoute);

var port =process.env.PORT || 1234;
app.listen(port,()=>{

    process.stdout.write('server started on port '+port);
});
