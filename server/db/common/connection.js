const mongoose=require('mongoose');
const config=require('../common/config');
mongoose.connect(config.dbUrl, {useNewUrlParser: true},()=>{

    console.log('successfully connected to the db...');
});

module.exports=mongoose;