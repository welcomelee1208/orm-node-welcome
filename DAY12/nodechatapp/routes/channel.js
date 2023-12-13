// 채팅 페이지 정보관리 라우팅 기능 제공
var express = require('express');
var router = express.Router();

router.get('/', async (req, res) => {
    res.render('chat/index'); // views 폴더의 chat/index.ejs 렌더링
    
});
module.exports = router;