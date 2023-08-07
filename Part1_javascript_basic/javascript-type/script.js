// javascript type: 
// 1. primative type(Boolean, ..., null, undefined, immutable)
// 2. reference type(Object, Array, Function, Class)

// primative type (Call Stack Memory, 고정 크기, 실제 데이터 변수에 할당)
// refrence type (Heap Memory, 다이나믹 크기, Call Stack은 Heap Memory 주소를 할당)

// 3. javascript는 loosely typed, dynamic type type 명시 필요 없음.
let foo = 42;
console.log(typeof 42);


// Primative Type
// String
const name = "han";
// Number
const age = 30;
//Boolean
const hasJob = true;
// Null
const car = null;
// Undefined
let anything;
// Symbol
const sym = Symbol();


// Reference Type
// Array
const hobbies = ['walking', 'books'];
// Object
const address = {
    province: 'a',
    city: 'b',
}
console.log(typeof hobbies);
console.log(Array.isArray(hobbies));
console.log(Array.isArray(address));