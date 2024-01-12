//apiMiddleware의 목적은
//각저오 RESTFULapi 라우터/라우팅 메소드에서 데이터를 요청하는 측에서
//jwt사용자 로그인인증토큰이 있는지 없는지를 체크해서 후행작업을 제어하는 미들웨어 구현
//apiMiddleware.js 해당 호풀 api를 해당 요청 사용자가 호출/사용가능한지에 대한 권한체크 미들웨어
const jwt = require('jsonwebtoken')

exports.tokenAuthChecking = async(req,res,next)=>{

    //STEP1: 발급된 토큰정보가 존재하지 않을경우 
    if(req.headers.authorization == undefined){
        var apiResult ={
            code:400,
            data:null,
            msg:"사용자 인증토큰이 제공되지 않았습니다"
        }
        return res.json(apiResult);
    }//제공 토큰의 유효성을 체크해서 유효 하지 않으면 (만료토큰) 팅기고 정상적인 토큰이면 담음 콜백함수로 흘려보내기
    try{
        var token =req.headers.authorization.split('Bearer ')[1]
        var tokenJsonData= await jwt.verify(token,process.env.JWT_SECRET)
        if(tokenJsonData !== null){
            next()
        }
    }catch(err){
        var apiResult={
            code:400,
            data:null,
            msg:"유효하지않은 사용자 인증토큰입니다."
        }
    }
};