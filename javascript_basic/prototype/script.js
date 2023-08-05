let user = {
    name: 'John',
    age: 25,
}

console.log(user.name);
// Prototype이 Object이고, hasOwnProperty() 메서드를 상속받아 사용한다. (Prototype chain)
console.log(user.hasOwnProperty('email'));


// 1. using protoype

/*
function Person(name, email, birthday) {
    this.name = name;
    this.email = email;
    this.birthday = new Date(birthday);
    //this.calculateAge = function () {
    //    const diff = Date.now() - this.birthday.getTime();
    //    const ageDate = new Date(diff);
    //    return Math.abs(ageDate.getUTCFullYear() - 1970);
    //}
}

Person.prototype.calculateAge = function () {
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
*/


// 2. using object.create()

function Person(name, email, birthday) {
    let person = Object.create(personPrototype);
    person.name = name;
    person.email = email;
    person.birthday = new Date(birthday);
    return person;
}

const personPrototype = {
    calculateAge () {
        const diff = Date.now() - this.birthday.getTime();
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}

const john = new Person('John', 'tt@tt.com', '7-10-91');
console.log(john);
console.log(john.calculateAge());