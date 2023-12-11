
//상수 정의
const odd ="홀수 입니다."
const even ="짝수 입니다."

function test(){
    console.log("Base 모듈의 test 함수가 호출 되었습니다")
}
//base1모듈에서 정의된 각종 상수/변수 이나 기능을 외부로 노출해야 기능이 제공된다
//module.export  를 통해 객체 형태로 해당 모듈의 기능과 속성을 노출한다.


console.log("base1모듈이 출 되었습니다.")

module.exports ={
    odd,
    even,
    test
}