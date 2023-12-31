//콜백함수 구현 및 테스트



function fnPlus(a,b){
    let c= a+b
    logging(c);
    return c
}
//계산 결과를 터미널에 출력해주는 로깅 함수
function logging(result){
    console.log(`계산 결과값은 ${result}입니다.`)
}
//계산함수 호출하기
//var result =fnPlus(10,20)
//console.log("함수반환값",result)

// 콜백함수로 기능구현하기
//기존 로깅 함수를 특정 함수의 파라메터로 전달해서 해당 함수내에서 전달된 함수를 실행하는 방식/콜백함수

function fnPlus1(a,b,callBack){
    let c = a+b
    callBack(c)
    return c
}
// 호출하는 쪽에서 전달된 값에다가 기본배송비를 추가하여
//로직을 변경/추가하여 변경된 값을 출력한다.
function logging1(result){
    var total = 3000+result
    console.log(`계산 결과는 배송비가 추가되어${total}원입니다.`)
}

var result1 = fnPlus1(20,34,logging)
var result2 = fnPlus1(20,34,logging1)
var result3 = fnPlus1(20,30,function(result){
    var total = 3000+result
    console.log(`직접 콜백함수 구현 전달:계산 결과는 배송비가 추가되어${total}원입니다.`)
})

//콜백함수를 사용하는 목적은 비동기 방식으로 처리되는 자바스크립트 프로그래밍에서
//순차적/절차적인 (비지니스 로직)인 프로그래밍을 위해서 콜백함수를 사용한다
//특정 기능을 구현하는 함수에다 특정함수를 매개 변수로 전달해서 해당 함수내의 특정 위치에서
//전달된 콜백함수를 실행시켜 원하는 로직/절차를 순차적으로 구현되게 할 수 있다.


/*객체지향 프로그래밍(object oriented programming =oop)의 주요 개념
일반화: 클래스와 객체(실체): 실체(현실에 존재하는 물체)의 공통속성/기능을 일반화 시킨 개념이 클래스
추상화,상속,다형성,캡슐화
추상화(abstraction): 상속(부모 클래스를 상속받아 자식 클래스를 만드는것)과 
추상화인터페이스(미리 클래스에서 구현 해야하는 기능과 속성을 정의만 한다.->구현은 하지않는다.)
추상화인터페이스와 콜백 함수는 비슷한 개념
*/