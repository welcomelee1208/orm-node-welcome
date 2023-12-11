
//사용자가 요청한 url에서 특정 파라메터가 존재하는지 사전체크하는 미들웨어 함수
//http ://localhost:3000/test/welcome
exports.checkParams =(req,res,next)=>{

    if(req.params.id == undefined){
    console.log("아이디 파라메터가 존재하지 않습니다.")
    }else{
    console.log("아이디 파라메터가 존재합니다.id:",req.params.id)
}
    next()
}

//사용자 요청 url 주소에서 querystring방식으로 카테고리라는 키값이 전달되는 체크하는 미들웨어 함수
exports.checkQueryKey = (req,res,next)=>{
    if(resizeBy.query.category == undefined){
        console.log("카테고리키가 전달되지 않았습니다.")
    next()
    }
}