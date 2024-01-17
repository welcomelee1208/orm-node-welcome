var express = require('express');
var router = express.Router();

//bcryptjs 단방향 암호화 패키지 참조하기
const bcrypt = require('bcryptjs');

//양방향 암호화 알고리즘 패키지 참조하기 
const AES = require("mysql-aes");

var db = require('../models/index');
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;
// const {isLoggedIn,isNotLoggedIn}
// = require('./sessionMiddleware')
const {isLoggedIn,isNotLoggedIn} = require('./passportMiddleware')
/* 
기능: 관리자 계정 목록 조회 웹페이지 요청
호출주소: http://localhost:3000/admin/list
 */
router.get('/list', isLoggedIn,async(req, res, next)=> {
    var searchOption = {
        companyCode:"0",
        adminid:"",
        usedYNCode:"9"
    };

    //
    //var admins = await db.Admin.findAll();
    var sqlQuery =`SELECT 
    admin_member_id,company_code,admin_id,admin_password,admin_name,
    CONVERT(AES_DECRYPT(UNHEX(email),'${process.env.MYSQL_AES_KEY}')USING utf8) as email,
    CONVERT(AES_DECRYPT(UNHEX(telephone),'${process.env.MYSQL_AES_KEY}')USING utf8) as telephone,
    dept_name,used_yn_code,reg_date,reg_member_id 
    FROM admin_member;`;

    var admins = await sequelize.query(sqlQuery,{
        raw: true,
        type: QueryTypes.SELECT,
    });

    res.render('admin/list.ejs',{admins,searchOption});
});



/* 
기능: 관리자 계정 등록 처리 웹페이지 요청
호출주소: http://localhost:3000/admin/create
 */
router.get('/create', isLoggedIn,async(req, res, next)=> {
    res.render('admin/create.ejs');
});



/* 
기능: 관리자 계정 등록처리 라우팅메소드
호출주소: http://localhost:3000/admin/create
 */
router.post('/create', async(req, res, next)=> {

    //step1: 관리자가 입력한 관리자 계정입력정보 수집하기
    var companyCode = req.body.companyCode;
    var adminid = req.body.adminid;
    var admin_password = req.body.admin_password;
    var admin_name = req.body.admin_name;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var usedYNCode = req.body.usedYNCode;
    var dept_name = req.body.dept_name;


//단방향 암호화 
    var encryptedPassword = await bcrypt.hash(admin_password,12);


//전화번호 개인정보를 양방향 암호화 적용
    var encryptedTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);


    //step2:추출된 데이터를 기반으로 DB입력 객체 생성
    var admin = {
        company_code:companyCode,
        admin_id:adminid,
        admin_password:encryptedPassword,
        admin_name,
        email,
        telephone:encryptedTelephone,
        dept_name,
        used_yn_code:usedYNCode,
        reg_date:Date.now(),
        reg_member_id:1,
        edit_date:Date.now(),
        edit_member_id:1
    };


    //step3: ORM기반 데이터 등록처리
    await db.Admin.create(admin);

    res.redirect('/admin/list');
});


/* 
기능: 관리자 계정 정보확인 및 수정처리 웹페이지 요청 
호출주소: http://localhost:3000/admin/modify/1
 */
router.get('/modify/:aid',isLoggedIn, async(req, res, next)=> {
    var aid = req.params.aid;
    var admin = await db.Admin.findOne({where:{admin_member_id:aid}});

    //AES.decrypt('양방향 암호화된 DB에 저장된값',암호화시 사용한 암호화키값);
    
    admin.telephone = AES.decrypt(admin.telephone, process.env.MYSQL_AES_KEY);

    res.render('admin/modify.ejs',{admin});
});
router.post('/modify/:aid',isLoggedIn,async(req,res,next)=>{
    var aid = req.params.aid;

    var admin_id = req.body.admin_id
    var admin_password= req.body.admin_password
    var company_code= req.body.company_code
    var admin_name = req.body.admin_name
    var email= req.body.email
    var telephone= req.body.telephone
    var dept_name = req.body.dept_name
    
    var updatedadmin ={
        admin_id,
        admin_password,
        company_code,
        admin_name,
        email,
        telephone,
        dept_name,
        used_yn_code:1,
        reg_user_id:1,
        reg_date:Date.now()
    }
await db.Admin.update(updatedadmin,{
    where:{admin_member_id:aid}
})
    res.redirect('/admin/list')

})


module.exports = router;