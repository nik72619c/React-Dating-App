var verifyToken=function (request,response,next){
    let authHeader=request.headers['authorization'];
    if(typeof authHeader!='undefined'){

        let bearer=authHeader.split(' ');
        console.log('bearer', bearer);
        let token=bearer[1];

        console.log('token', token);
        request.token=token;
        jwt.verify(request.token,'secretkey',(err,authData)=>{
            console.log('authData', authData);
            if(err){
                response.sendStatus(403);
            }
            else if(authData){
                request.authData=authData;
                request.email=authData.email;
                next();
            }
        });
    }

   else {

    response.sendStatus(403);
    }
}

module.exports=verifyToken;