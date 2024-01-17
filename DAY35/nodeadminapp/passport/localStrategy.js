var bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
var db = require('../models/index')
module.exports = passport =>{

    //passport.use(new LocalStrategy('로그인 화면의 아이디/암호 UI요소의 네임값 설정',로그인 처리 함수정의)) 
    //로그인처리함수 정의(사용자가 입력한 아이디값,사용자가 입력한 암호값,후행 콜백함수)
    passport.use(new LocalStrategy(
        {
        usernameField :'id',
        passwordField :'password'
    },async(adminId,adminPWD,done)=>{
        //사용자가 입력한 아이디/암호를 기반으로 로그인 기능을 구현합니다.
        try{
                //step1: 동일한 사용자 아이디 정보조회
            const admin = await db.Admin.findOne({where:{admin_id:adminId}})
            if(admin){
                //step2:사용자 암호체크
            const result =await bcrypt.compare(adminPWD,admin.admin_password)
            if(result){
                //관리자 아이디 암호가 일치하는 경우
                //step3:  로그인 관리자의 세션 정보 구조 정의및 데이터 바인딩
                var sessionLoginData ={
                    admin_member_id:admin.admin_member_id,
                    company_code:admin.company_code,
                    admin_id:admin.admin_id,
                    admin_name:admin.admin_name,
                };
                done(null,sessionLoginData)

            }else{
                //관리자 아이디 암호가 일치하지 않는 경우
            done(null,false,{message:'비밀번호가 일치하지 않습니다.'})
            }
            }else{
                //동일한 아이디가 일치하지 않는 경우
                done(null,false,{message:'아이디가 일치하지 않습니다.'})
            }

        }catch(err){
            done(err)
        }
    }));
    




}