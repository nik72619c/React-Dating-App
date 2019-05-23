const mongoose=require('../common/connection');
const schema=mongoose.Schema;

var userSchema= new schema({
    'name': String,
    'gender': String,
    'profile_image_url': String,
    'password': String,
    'email': String
});

var userModel= mongoose.model('users', userSchema);
module.exports=userModel;

