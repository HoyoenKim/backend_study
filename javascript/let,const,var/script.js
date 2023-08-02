var greeting = 'Hello';
console.log(greeting);

var greeting = 'Hi';
console.log(greeting);

greeting = 'How are you?';
console.log(greeting);

let greeting2 = 'Hello';
console.log(greeting2);

// 중복 선언 불가
// let greeting2 = 'Hi' // error

// 재할당 가능
greeting2 = 'How are you?';

const greeting3 = 'Hello';
console.log(greeting3);

// 중복 선언 불가
// const greeting3 = 'Hi';

// 재할당 불가
// greeting3 = 'How are you?';

// var: 함수 레벨 scope
function func() {
    if(true) {
        var a = 'a';
        console.log(a);
    }
    console.log(a);
}
func();
// 유효하지 않은 var 참조 레벨
// console.log(a);

// let, const: 블록 레벨 scope
function func2() {
    if(true) {
        let a = 'a';
        console.log(a);
    }
    // 유효하지 않은 let, const 참조 레벨
    // console.log(a);
}
func2();

// var 호이스팅
// javascript interpreter는 변수의 선언 및 할당을 분할한다.
// var 선언은 코드가 실행되기 전에 되고 undefined로 할당된다.
// 초기화되기 전에 greeting4를 사용할 수 있다.
console.log(greeting4); // undefined
var greeting4 = 'Hello';

// func 호이스팅
// 선언 전에 호출해도 된다.
func3();
function func3() {
    console.log('Hosting test');
}

// let, const 호이스팅
// let, const 선언은 코드가 실행되기 전에 되고 undefined를 포함한 어떤 값이라도 할당하지 않는다.
// var 와 달리 undefined로 초기화하지 않는다.

// console.log(greeting5); // TDZ(Temporal Dead Zone) error
let greeting5 = 'Hello'
