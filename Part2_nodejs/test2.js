/*
let count = 0;
const cb = () => {
    if(count < 20) {
        console.log(`Processing nextTick cb ${++count}`);
        process.nextTick(cb);
    }
}
setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('setTimeout'), 100);
process.nextTick(cb);
console.log('sarted');
*/


let count2 = 0;
const cb2 = () => {
    if(count2 < 2000) {
        console.log(`Processing setImmediate cb ${++count2}`);
        setImmediate(cb2);
    }
}
setImmediate(cb2);
setTimeout(() => console.log('setTimeout'), 50);
console.log('sarted');
