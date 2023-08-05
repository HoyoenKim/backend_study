// window Object
// 1. window Object는 브라우져에서 자동으로 생성됨, 웹 브라우저의 window
// 2. window Object는 브라우져 객체, javascript의 객체가 아님
// 3. window Object를 통해 브라우저 창의 정보를 알고 제어할 수 있음
// 4. 함수 선언, var 로 변수 선언 시 window 객체의 property가 됨
let val;
val = window.outerHeight;
console.log(val);
val = window.innerHeight;
console.log(val);
val = window.innerWidth;
console.log(val);
val = window.outerWidth;
console.log(val);
val = window.scrollY;
console.log(val);
val = window.scrollX;
console.log(val);
val = window.location;
console.log(val);
//val.href = 'http://www.google.com'
val = window.history;
console.log(val);
val = window.navigator;
console.log(val);