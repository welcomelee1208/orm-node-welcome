module.exports = router;var express = require('express');
var router = express.Router();
//bcryptjs 단방향 암호화 패키지 참조하기
const bcrypt = require('bcryptjs');
//mysql-aes 양방향 암호화 패키지 참조하기
const AES = require("mysql-aes")
var db = require('../models/index');
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;
/* 
기능: 관리자 계정 목록 조회 웹페이지 요청
호출주소: http://localhost:3000/admin/list
 */

    router.get("/list", async (req, res, next) => {
        var searchOption = {
        companyCode: "0",
        adminid: "",
        usedYNCode: "0",
        };
        
        //var admins = await db.Admin.findAll();
        var sqlQuery =`SELECT 
    company_code,admin_id,admin_password,admin_name,
    CONVERT(AES_DECRYPT(UNHEX(email),'${process.env.MYSQL_AES_KEY}')USING utf8) as email,
    CONVERT(AES_DECRYPT(UNHEX(telephone),'${process.env.MYSQL_AES_KEY}')USING utf8) as telephone,
    dept_name,used_yn_code,reg_date,reg_member_id 
    FROM admin;`;

    var admins = await sequelize.query(sqlQuery,{
        raw: true,
        type: QueryTypes.SELECT,
    });
        res.render("admin/list.ejs", { admins, searchOption });
        });




/* 
기능: 관리자 계정 등록 처리 웹페이지 요청
호출주소: http://localhost:3000/admin/create
 */
router.get('/create', async(req, res, next)=> {
    res.render('admin/create.ejs');
});



/* 
기능: 관리자 계정 등록처리 라우팅메소드
호출주소: http://localhost:3000/admin/create
 */
router.post('/create', async(req, res, next)=> {
    //step1: 관리자가 입력한 관리자 계정 입력정보 수집하기
    var company_code = req.body.company_code
    var admin_id = req.body.admin_id
    var admin_password = req.body.admin_password
    var admin_name = req.body.admin_name
    var telephone = req.body.telephone
    var email = req.body.email
    var used_yn_code = req.body.used_yn_code
    var dept_name = req.body.dept_name
//  관리자 암호를 해시 알고리즘 기반 단방향 암호화 적용하기
//bcrypt.hash('암호화할 문자, 암호화 변환횟수)
    var encryptedPassword = await bcrypt.hash(admin_password,12)
    //전화번호/이메일  개인정보를 양방향 암호화 (aes)적용하기
var encryptedEmail = AES.encrypt(email,process.env.MYSQL_AES_KEY)
var encryptedTelphone = AES.encrypt(telephone,process.env.MYSQL_AES_KEY) 
    //step2: 추출된 데이터를 기반으로 db입력 객체 생성
var admin = {
    company_code,
    admin_id,
    admin_password:encryptedPassword,
    admin_name,
    telephone:encryptedTelphone,
    email:encryptedEmail,
    used_yn_code,
    dept_name,
    reg_member_id:1,
    reg_date:Date.now(),
    edit_member_id:1,
    edit_date:Date.now()

}
await db.Admin.create(admin)
    res.redirect('/admin/list');
});
router.get('/modify/:aid', async(req, res, next)=> {
    var aid = req.params.aid
    var admin = await db.Admin.findOne({where:{admin_member_id:aid}})
    admin.email = AES.decrypt(admin.email,process.env.MYSQL_AES_KEY)
    admin.telephone = AES.decrypt(admin.telephone,process.env.MYSQL_AES_KEY)
    res.render('admin/modify',{admin});
});


module.exports = router;