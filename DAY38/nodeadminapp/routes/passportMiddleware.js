//로그인 여부 체크 후 
//미로그인 상태시 로그인페이지로 이동
// 로그인 상태ed에서만 호출되어야할 라우팅 설정
exports.isLoggIn=(req,res,next)=>{
    if(req.isAuthenticated()){
        // 인증 되었으면 다음으로 보내줄것
        next()
    }else{
        // 인증이 되지 않았으면 로그인으로 다시 보내버릴것
        res.redirect('/login')
    }
}
// if 사용자가 로그인을 안한 상태일시=> 특정페이지로 이동(로그인 없이 볼수 있는 메인)
exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next()
    }else{
        res.redirect('/')
    }
}