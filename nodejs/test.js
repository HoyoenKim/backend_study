// 1. global object
// process object 는 nodejs 에서 사용가능, 브라우저에서 불가능
// window object 는 반대
// console api 는 둘다 가능

// node test.js "John Doe"
var name = process.argv[2];
console.log(`${name} Hello!`);