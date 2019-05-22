const express=require('express');
const app=express();
// const cors=require('./utils/middlewares/cors');
const cors=require('cors');

const bodyParser= require('body-parser');
// const adminRoute=require('./routes/adminroutes');
// const productRoute=require('./routes/productroutes');
// const session=require('express-session');
// const config=require('./db/common/config');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (request, response)=>{

response.send('node backend works');

});

app.use(cors({

    origin: 'http://localhost:4200',
    credentials: true
}));
// app.use('/',adminRoute);
// app.use('products',productRoute);


var port =process.env.PORT || 1234;
app.listen(port,()=>{

    process.stdout.write('server started on port '+port);
});
