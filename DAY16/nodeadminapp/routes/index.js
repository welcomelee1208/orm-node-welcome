var express = require('express');
var router = express.Router();




/*관리자 웹사이트 로그인 페이지  요청과 응답처리 라우팅 메소드
호출주소:http://localhost:3000/login
*/
router.get('/login',async(req, res, next)=>{
    res.render('login');
});
/*관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드
호출주소:http://localhost:3000/
*/
router.get('/',async(req, res, next)=>{
    res.render('index');
});
router.post('/login',async(req,res,next)=>{
    var companycode =req.body.company_code
    var adminId= req.body.admin_id
    var adminPassword = req.body.admin_password
    var deptname= req.body.dept_name

    var admin={
        companycode,
        adminId,
        adminPassword,
        deptname
    }
    res.redirect('/')
})

router.get('/login', (req, res) => {
    res.render('login', { layout: false });
  });
  
module.exports = router;
