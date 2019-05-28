const Users=require('./schema/userSchema');
var userOperations={
    likeUser: function (userObject, cb){
        let targetEmail=userObject.targetEmail;
        let email=userObject.email;
        // console.log('token received from middleware', userEmail);
        Users.findOneAndUpdate({email: email}, {$push: {liked: targetEmail}},(err,content)=>{
            if(err){
                console.log('error occured...');
            }

            else{
                console.log('the like userOperation performed successfully..');
                cb();
            }
        });
    },
    blockUser: function (request, response){
        let email=request.body.email;
        let userEmail=request.email;
        Users.findOneAndUpdate({email: userEmail}, {$push: {blocked: email}},(err,content)=>{
            if(err){
                response.json({
                    err: err,
                    status: 404
                })
            }

            else{
                response.json({
                    status: 200,
                    message: 'user blocked successfully...'
                })
            }
        });
    },
    superlikeUser: function (request,response){
        let email=request.body.email;
        let userEmail=request.email;
        console.log('token received from middleware', userEmail);
        Users.findOneAndUpdate({email: userEmail}, {$push: {blocked: email}},(err,content)=>{
            if(err){
                response.json({
                    err: err,
                    status: 404
                })
            }

            else{
                response.json({
                    status: 200,
                    message: 'user blocked successfully...'
                })
            }
        });
    },
    getUsers: function (request, response){
        console.log('inside getUsers function in useroperations');
        Users.find({}, (err, content)=>{
            if(err){
                console.log('error occured in finding users..');
                response.json({
                    err: err
                })
            }

            else if(content && content.length>0){
                console.log('retreived users');
                response.json({
                    status: 200,
                    content: content
                })
            }
            else {
                console.log('some other error occured in finding users..');
                response.json({
                    status: 404,
                    responseText: 'some other error occured in finding users'
                })
            }
        })
    }
    
};

module.exports=userOperations;