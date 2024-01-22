const LocalStrategy = require('passport-local').Strategy
var db = require('../models/index')
var bcrypt = require('bcryptjs')
module.exports = passport =>{
    passport.use(new LocalStrategy(
        {
            usernameField:"id",
            passwordField:"password"
        },async(adminId,adminPWD,done)=>{
            try{
                //아이디 정보조회
                const admin = await db.Admin.findOne({where:{admin_id:adminId}})
                if(admin){
                    //암호 체크
                    const result = await bcrypt.compare(adminPWD,admin.admin_password)
                    if(result){
                        // 비밀번호와 아이디 연결될 경우/관리자의 세션정보구조 및 데이터 바인딩
                        var sessionLoginData = {
                            admin_member_id:admin.admin_member_id,
                            company_code:admin.company_code,
                            admin_id: admin.admin_id,
                            admin_name : admin.admin_name
                        }
                        done(null,sessionLoginData)
                    }else{
                        //암호가 일치하지 않을떄
                        done(null,false,{message:'비밀번호가 일치하지 않습니다.'})
                    }
                }else{
                    //동일한 아이디가 존재하지 않는 경우
                    done(null,false,{message:'동일한 아이디가 존재하지 않습니다'})

                }

            }catch(err){
                done(err)

            }
        }))

}
