// oop
// 1. abstract
// 2. inheritance
// 3. polymorphism (overriding)
// 4. encapsulation
// Class를 이용하여 OOP를 구현한다, OOP는 내부에서 Prototype을 사용하여 작동한다.
class Person {
    constructor(name, email, birthday) {
        this.name = name;
        this.email = email;
        this.birthday = new Date(birthday);
    }

    introduce() {
        return `Hello, my name is ${this.name}`;
    }

    // static은 prototpye이 아닌 클래스 함수 자체의 method이다.
    static multipleNumbers(num1, num2) {return num1 * num2;}
}

const john = new Person('John', 'envkt@example.com', '10-3-98');
console.log(john.introduce());
console.log(john); // true
console.log(Person.multipleNumbers(2, 3)); // 6

class Client extends Person {
    constructor(name, email, birthday, phone, address) {
        super(name, email, birthday);
        this.phone = phone;
        this.address = address;
    }
}

const jane = new Client('Jane', 'envkt@example.com', '10-3-98', '010-1234-5678', 'Seoul');
console.log(jane.introduce());