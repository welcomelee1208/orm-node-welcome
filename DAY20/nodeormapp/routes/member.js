//사용자 정보 처리를 위한 웹페이지 요청과 응답처리 전용 라우팅 메소드
var express = require('express');
var router = express.Router();
// model 영역에서 db객체 참조하기
var db = require('../models/index');


// 회원가입 웹페이지 요청및 응답처리 
// loca
router.get('/entry', async(req, res, next)=> {
    res.render('member/entry');
});

//회원가입 웹페이지 응답처리
router.post('/entry', async(req, res, next)=> {

    //회원가입 정보 추출하기
    var email = req.body.email
    var password = req.body.password
    //데이터 베이스에 dmembers 테이블 데이터 저장
    // db에 전달되는 json데이터의 속성명은 반드시 해당 데이터 모델의 (model/member.js)의 속성명과 동일해야한다.
    var member={
        email,
        password
    }
    // db에 저장하고 저장된값을 받는다.
    //db.member.create()는 ORM 프레임워크에 의해서 벡엔드에서
    //INSERT INTO members(email,password,createdAt)Values('사용자가 입력한 메일주소', '암호',now()) sql 쿼리가 만들어져서
    //mysql db 서버로 전달되어 데이터가 입력되고 입력되 ㄴ데이터를 mysql서버에서 반환해준다.


var savedMember = await db.Member.create(member)

    res.redirect('/');
});
// 로그인  웹페이지 요청및 응답처리 
router.get('/login', async(req, res, next)=> {
    res.render('member/login',{resultMsg:"",email:"",password:""});
});

//로그인 웹페이지 응답처리
router.post('/login', async(req, res, next)=> {
    // step1: 사용자 로그인 정보 추출
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
    }else{
        //db에 저장된 조회된 사용자의 암호값과 사용자가 입력한 암호값이 일치하면
        if(member.password == password ){
            res.redirect('/')
        }else{
            resultMsg = '암호가 일치하지않습니다.'
        }
    }
    if(resultMsg !== ''){
        res.render('member/login',{resultMsg,email,password})
    }
});

module.exports = router;
