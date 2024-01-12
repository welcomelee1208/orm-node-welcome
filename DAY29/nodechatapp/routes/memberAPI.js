//채팅방 데이터를 관리하는 restFul 라우터 파일 
//http://localhost:3000/api/member~

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var db= require("../models/index")
var AES = require('mysql-aes')
var{tokenAuthChecking}= require('./apimiddleware') 
router.post('/entry',async(req,res,next)=>{
    var apiResult ={
        code:400,
        data:null,
        msg:""
    }

    try{
        var email = req.body.email
        var password = req.body.password
        var name = req.body.name
        var telephone = req.body.telephone
        
        //회원가입 로직 추가: 메일주소 중복체크
        var existMember = await db.Member.findOne({where:{email}})
        if(existMember !=null){
            apiResult.code = 500,
        apiResult.data = null
        apiResult.msg = "existedDoubleEmail"
        }else{

        
        //단방향 호화해서 해시 알고리즘 적용 사용자암호적용
        var encryptedPassword = await bcrypt.hash(password,12)
        var encryptedTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);
        //불필요한 중요데이터 속성값은 지우고 프런트엔드에 전달
        
        var member = {
            email,
            member_password : encryptedPassword,
            name,
            profile_img_path:"",
            telephone:encryptedTelephone,
            entry_type_code:1,
            use_state_code:1,
            reg_date:Date.now(),
            reg_member_id:0

        }
        var registedMember = await db.Member.create(member)  
        registedMember.member_password=""
        registedMember.telephone = AES.decrypt(encryptedTelephone, process.env.MYSQL_AES_KEY)
        apiResult.code = 200,
        apiResult.data = registedMember,
        apiResult.msg = "ok"
        }
        

    }catch(err){
        console.log("서버에러발생/api/member/entry:",err.message)
        apiResult.code = 500,
        apiResult.data = null
        apiResult.msg = "Failed"
    }

    res.json(apiResult)
})

router.post('/login',async(req,res,next)=>{
    var apiResult ={
        code:400,
        data:null,
        msg:""
    }

    try{
        var email = req.body.email
        var password = req.body.password
        var member = await db.Member.findOne({where:{email:email}})
        var resultMsg=""
        if(member == null ){
            resultMsg="NotExistEmail"
            apiResult.code = 400,
            apiResult.data =null,
            apiResult.msg = resultMsg
        }else{
        //step2:단방향 암호화 기반 동일암호일치여부 체크
        //단방향 암호화해시알고리즘 체크
        var compareResult = await bcrypt.compare(password,member.member_password)
        if(compareResult){
            resultMsg="ok"
            member.member_password=""
            //step3: 인증된 사용자의 기본정보 jwt 토큰 생성 발급
            //step3-1: JWT 토큰에 담을 사용자 정보 생성
            //jwt인증 사용자 정보 토큰값 구조정의및 데이터 세팅
            var memberTokenData = {
            member_id:member.member_id,
            email:member.email,
            name:member.name,
            profile_img_path:member.profile_img_path,
            telephone:member.telephone
            }

            var token = await jwt.sign(memberTokenData,process.env.JWT_SECRET,{expiresIn:'24h',issuer:'welcome'})





            apiResult.code = 200,
            apiResult.data =token
            apiResult.msg = resultMsg
        }else{
            resultMsg="NotCorrectPassword"
            apiResult.code = 400,
            apiResult.data =null,
            apiResult.msg = resultMsg
        }
        }
    }catch(err){
        console.log("서버에러발생 tlqkf-/api/member/login:",err.message)
        apiResult.code = 500,
        apiResult.data = null
        apiResult.msg = "Failed"
    }

    res.json(apiResult)
})
router.post('/find',async(req,res,next)=>{
    res.json({})
})
//로그인한 현재 사용자의 회원기본정보 조회
router.get('/profile',tokenAuthChecking,async(req,res,next)=>{
    var apiResult ={
        code:400,
        data:null,
        msg:""
    }
    try{
        //step1: 웹브라우저 헤더에서 사용자 jwt인증 토큰값을 추출한다.
        var token =req.headers.authorization.split('Bearer ')[1]
        var tokenJsonData= await jwt.verify(token,process.env.JWT_SECRET)
        
        //
        var loginMemberId = tokenJsonData.member_id
        

        var dbMember = await db.Member.findOne({
            where:{member_id:loginMemberId},
            attributes:['email','name','profile_img_path','telephone']
        })
        dbMember.telephone = AES.decrypt(encryptedTelephone, process.env.MYSQL_AES_KEY)



        apiResult.code = 200,
        apiResult.data =dbMember,
        apiResult.msg = "ok"
    }
    catch(err){
        apiResult.code = 500,
        apiResult.data =null,
        apiResult.msg = "Failed"
    }
    res.json(apiResult)
})

    module.exports = router;