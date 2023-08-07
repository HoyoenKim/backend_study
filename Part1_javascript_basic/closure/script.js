function outer(o) {
    return function inner(i) {
        console.log('outer: ' + o);
        console.log('inner: ' + i);
    };
}

const newFunction = outer('outer');
console.log('newFunction: ' + newFunction);
newFunction('inner');


let a = 'a';
function functionA() {
    let b = 'b';
    return function functionB() {
        let c = 'c';
        console.log(a, b, c);
    };
};
var A = functionA();
A();