//채팅방 데이터를 관리하는 restFul 라우터 파일 
//http://localhost:3000/api/member~

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var db= require("../models/index")
var AES = require('mysql-aes')
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
            resultMsg="notExistEmail"
            apiResult.code = 400,
            apiResult.data =null,
            apiResult.msg = resultMsg
        }else{
        //단방향 암호화해시알고리즘 체크
        var compareResult = await bcrypt.compare(password,member.member_password)
        if(compareResult){
            resultMsg="ok"
            member.member_password=""
            apiResult.code = 200,
            apiResult.data =member,
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



    module.exports = router;