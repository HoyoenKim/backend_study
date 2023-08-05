// dom (Document Object Model), winodw.document
// 1. 메모리에 웹 페이지 문서 구조를 트리 구조로 표현하여 웹 브라워가 HTML 페이지를 인식하게 해준다.
// 또한 이를 javascript가 이용할 수 있도록 트리구조로 만든 객체 모델이다.

// 2. dom 의 api 를 이용하여 elemen 의 조작이 가능하다. ex) button

// 3. 웹 페이지 빌드 과정 (Citical Render Path)
// html(-> DOM), javascript, css(-> CSSOM) -> dom tree -> render tree -> layout (Access Tree) -> paint
// render tree 이후의 과정을 최소화해야 빠르다!

/*
let val;
val = document;

val = document.baseURI;
console.log(val);
val = document.head;
console.log(val);
val = document.forms;
console.log(val);
val = document.forms[0].id;
console.log(val);
val = document.forms[0].classList;
console.log(val);
val = document.forms[0].className;
console.log(val);
val = document.scripts;
console.log(val);
val = document.scripts[1].getAttribute('src');
console.log(val);
*/

const headerContainer = document.getElementById('header-container');
//headerContainer.style.display = 'none';
headerContainer.textContent = 'Text content';
headerContainer.innerText = 'Inner Text';
headerContainer.innerHTML = '<span>dd</span>';
//console.log(headerContainer);

const items = document.getElementsByClassName('list-group-item');
console.log(items);
items[0].style.color = 'blue';
items[3].textContent = 'hello000';

let lists = document.getElementsByTagName('li');
console.log(lists);
lists = Array.from(lists);
console.log(lists);

lists.forEach( (element, i) => {
    element.textContent = `${i}.List`;
   console.log(element); 
});

const listOdd = document.querySelectorAll('li:nth-child(odd)');
listOdd.forEach((li) => {
    li.style.backgroundColor = 'grey';
});

// innerHTML: html 까지 보여줌
// innerText: 공백 무시 하나만 보여줌
// textContent: 스타일 그대로 보여줌

// Event Listner
// 1. javascript code propery (onclick, onload in js)
// 2. HTML tag property (onclik in html)
// 3. addEventLister