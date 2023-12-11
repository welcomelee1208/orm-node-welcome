const { odd,even,test } = require ("./base1")
const checkOddOrEven = require ("./base2")


//문자열 텍스트를 전달하면 문자열의 길이값을 2로 나눠서 나온 나머지값이 홀짝인지 판단 하는 함수
function checkStringOddorEven(str){
    if(str.length%2){
        return odd
    }else{
        return even
    }
}

console.log("숫자에 대한 홀수짝수여부를 판단해 보자",checkOddOrEven(18))
console.log("문자열 길이가 홀수인지 짝수인지 판단해 보자",checkStringOddorEven("안녕하세요 적당히 바람이 시원해 ?"))




