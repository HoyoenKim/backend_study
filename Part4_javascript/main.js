function StirngNumber() {
    let string1 = "Hello";
    let string2 = 'Hello';
    let string3 = `Hello ${string1}`;
    
    console.log(string1, string2, string3);
    
    let number = 123;
    let pi = 3.141592653589793;
    console.log(number + 1);
    
    console.log(number + undefined);
    console.log(typeof number + undefined);
    
    let a = 0.1;
    let b = 0.2;
    console.log((a + b).toFixed(1));
    console.log(typeof (a + b).toFixed(1));
    console.log(typeof Number((a + b).toFixed(1)));
}

function BooleanNullUndefined() {
    
}