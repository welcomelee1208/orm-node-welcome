var express = require('express');
var router = express.Router();
var db = require('../models/index')
var bcrypt = require('bcryptjs')
var AES = require('mysql-aes');
var jwt = require("jsonwebtoken")


//entry
router.post('/entry', async(req, res, next)=>{

    var apiResult = {
        code: 400,
        data: null,
        msg: "",
    };

    try {
            var email = req.body.email
            var password = req.body.password
            var name = req.body.name
            var telephone = req.body.telephone

        // 중복체크
        var regEmail = await db.Member.findOne({ where: { email:email } });

        if(regEmail != null) {

            apiResult.code = 500;
            apiResult.data = null;
            apiResult.msg = "ExistDoubleEmail";

        } else {
            
            // 단방향 암호화
            var encryptedPassword = await bcrypt.hash(password,6);
            // 양방향 암호화
            var encryptTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);

            var member = {
                email,
                member_password: encryptedPassword,
                name,
                telephone: encryptTelephone,
                profile_img_path:"",
                entry_type_code: 1,
                use_state_code: 1,
                reg_date: Date.now(),
                reg_member_id: 1,
                edit_date: Date.now()
            };

            const registedMember = await db.Member.create(member);

            registedMember.member_password = "";
            var decryptTelephone = AES.decrypt(encryptTelephone, process.env.MYSQL_AES_KEY)
            registedMember.telephone = decryptTelephone;

            apiResult.code = 200;
            apiResult.data = registedMember;
            apiResult.msg = "ok";
        }
    }catch(error) {
        console.log("서버에러발생-/api/member/entry", error);
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = "Failed";
    }
    res.json(apiResult);
})
//login
router.post('/login', async (req, res, next) => {
    var apiResult = {
        code: 400,
        data: null,
        msg: "",
    };

    try {
        var { email, password } = req.body;

        // 이메일 찾기
        var member = await db.Member.findOne({ where: { email: email } });
        var resultMsg = "";

        // member 이메일이 null 값일때
        if (member == null) {
            resultMsg = "NotExistEmail";
            apiResult.code = 400;
            apiResult.data = null;
            apiResult.msg = resultMsg;
        } else {
            // 패스워드는 단방향 암호화라서 복호화 불가능. 동일암호 일치여부 체크
            var comparePassword = await bcrypt.compare(password, member.member_password);

            if (comparePassword) {
                resultMsg = "Ok";

                member.member_password = "";
                member.telephone = AES.decrypt(member.telephone, process.env.MYSQL_AES_KEY);

                var memberToken = {
                    // 프라이머리키는 필수
                    member_id: member.member_id,
                    email: member.email,
                    name: member.name,
                    telephone: member.telephone,
                };

                var token = await jwt.sign(memberToken, process.env.JWT_SECRET, { expiresIn: '24h', issuer: 'welcome' });

                apiResult.code = 200;
                // 토큰데이터 넘기기
                apiResult.data = token;
                apiResult.msg = resultMsg;
            } else {
                resultMsg = "NotCorrectword";
                apiResult.code = 400;
                apiResult.data = null;
                apiResult.msg = resultMsg;
            }
        }
    } catch (error) {
        console.log("서버에러발생-/api/member/login", error.message);  
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = error.message;
    }
    res.json(apiResult);
});
// 로그인후 개인정보 프로필 정보조회 라우팅 메소드.
router.get('/profile',async(req,res,next)=>{
    var apiResult = {
        code: 400,
        data: null,
        msg: "",
    };
    try{
        //step1 . 현재 프로필 api를 호출하는 사용자 요청의 httpHeader 영역에서 authorization내 jwt토큰값 존재여부확인
        const token = req.headers.authorization.split('Bearer ')[1];
        console.log("req헤더에 저장된 jwt값 추출하기",token)
    }catch(err){
        console.log("프로필정보 로딩 오류", error.message);  
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.msg = error.message;
    }
    res.json()
})
module.exports = router;