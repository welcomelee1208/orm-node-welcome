// 사용자 정보 처리를 위한 RESTful 데이터 전용 요청과응답처리 라우팅 메소드.
var express = require('express');
var router = express.Router();

//모델 영역의 db객체를 참조합니다.
var db= require('../models/index');



// 회원 로그인 처리 RESTful API
//localhost:3000/api/member/login
router.post('/login', async(req, res, next)=> {
    
    var  apiResult={
        code:200,
        data:null,
        result:""
    }
        try{  // step1: 사용자 로그인 정보 추출
            var email=  req.body.email
            var password = req.body.password
        // step2: DB members테이블에서 동일한 메일주소의 단일 사용자 정보를 조회한다.
        // db.Member.findOne (해당 칼럼과 동일한 조건설정)ORM  메소드는
        //SELECT*FROM members WHERE email='사용자 입력메일주소값';의 SQL 구문을 벡엔드 환경에서 동적으로 만들어서 
        //MYSQL 서버로 전달해 실행하고 조회 결과물을 반환 받는다.
            var member = await db.Member.findOne({where:{email:email}})
        //STEP3:  로그인 처리 로직 구현
        var resultMsg='';
        if(member == null){
            resultMsg ='동일한 메일주소가 존재하지 않습니다.'
            apiResult.code=400;
            apiResult.data= null
            apiResult.result = resultMsg
        }else{
            //db에 저장된 조회된 사용자의 암호값과 사용자가 입력한 암호값이 일치하면
            if(member.password == password ){
                resultMsg='로그인 성공'
                apiResult.code=200;
                apiResult.data= member
                apiResult.result = resultMsg
            }else{
                resultMsg = '암호가 일치하지않습니다.'
                apiResult.code=400;
                apiResult.data= null
                apiResult.result = resultMsg
            }
        }

        }catch(err){
            resultMsg='서버에러발생 관리자에게 문의하세요'
                piResult.code=500;
                apiResult.data= null
                apiResult.result = resultMsg
        }
    res.json(apiResult)
});

module.exports = router;
