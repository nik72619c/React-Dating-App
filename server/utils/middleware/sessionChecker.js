const jwt=require('jsonwebtoken');
var verifyToken=function (request,response,next){
    let authHeader=request.headers['authorization'];
    console.log('authHeader', authHeader);
    if(typeof authHeader!='undefined'){
        console.log('inside sessionChecker middleware');
        let bearer=authHeader.split(' ');
        console.log('bearer', bearer);
        let token=bearer[1];

        console.log('token', token);
        request.token=token;
        jwt.verify(request.token,'secretkey',(err,authData)=>{
            
            if(err){
                response.json({
                    status: 403
                });
            }
            else if(authData){
                console.log('authorised');
                request.authData=authData;
                request.email=authData.email;
                next();
            }
        });
    }

   else {
    console.log('not authorised');
    response.json({
        status: 403
    })
    }
}

module.exports=verifyToken;