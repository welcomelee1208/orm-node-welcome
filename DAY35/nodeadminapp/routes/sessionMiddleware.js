

// 사용자 로그인 여부를 체크하고
//미로그인 상태에서의 요청시 로그인 페이지로 이동처리 시킨다.
//반드시 로그인을 한 상태에서만 호출되어야하는 각종 라우팅 메소드에서 설정해준다.
exports.isLoggedIn=(req,res,next)=>{
    if(req.session.loginUser != undefined){
    //현재 사용자가 로그인상태이면 요청한 라우팅 메소드로 흘러가게둔다.
    next()
    }else{
    res.redirect('/login')
    }
}
//사용자가 로그인을 안한 상태인 경우 특정페이지로 이동시키기
//만약 로그인 상태에서  회원가입 페이지에대한 요청을 해오는 경우 특정페이지로 이동시키기
//로그인을 안한 상태인 경우만 요청한 라우팅 메소드로 이동시키기 
exports.isNotLoggedIn=(req,res,next)=>{
    if(req.session.loginUser == undefined){
        //현재 사용자가 로그인 상태가 아니면 요청한 라우팅 메소드의 콜백함수가 실행됨(ex회원가입)
        next()
        }else{
        res.redirect('/')//로그인 했던 안했던 모든 사용자가 볼수있는 메인페이지로 이동시킴
        }
}