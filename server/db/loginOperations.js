const User=require('./schema/userSchema');
const loginOperations={
    fetchUser(userObject,request,response){

        console.log('userObject received at fetchUser function', userObject);

        Users.find({"email":userObject.email,"password":userObject.password},(err,content)=>{

            console.log('making the query for login...');
            if(err){
                console.log('inside if...');
                response.json({
                    status: 404,
                    responseText: 'some error occured while loggin you in !'
                })
            }

            else if(content && content.length>0){

                //create a jwt token here

                console.log('inside elseif...');
                let token=jwt.sign({email: userObject.email},"secretkey",{expiresIn: '300s'});
                console.log('token made is',token);
                response.json({
                    content,token
                });
            }

            else{
                console.log('inside else...');
                response.json({
                    status: 404,
                    responseText: 'some error occured while loggin you in !'
                })

            }
        })
    }
}

module.exports=loginOperations;