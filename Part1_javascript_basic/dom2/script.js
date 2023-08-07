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

/*
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
*/

// Event Listner
// 1. javascript code propery (onclick, onload in js)
// 2. HTML tag property (onclik in html)
// 3. addEventLister

window.onload = function() {
    let text = document.getElementById('text');
    text.innerText = 'html document loaded';

    const aElement = document.querySelector('a');
    aElement.addEventListener('click', () => {
        alert('a element clicked');
    })
}

const buttonElement = document.querySelector('.btn2');
buttonElement.addEventListener('click', (event) => {
    console.log(event);

    let val = event;
    console.log(val.target);
    console.log(val.target.id);
    console.log(val.target.className);
    console.log(val.target.classList);
    console.log(event.type);
    // distance from window 
    console.log(event.clientY);
    // distance from element
    console.log(event.offsetY);

})

/*
1) UI 이벤트 
load 문서나 객체가 로드 완료 되었을 때 발생 
change 객체의 내용이 변동되거나 focus를 잃었을 때 발생 
resize 객체의 크기가 바뀌었을 때 발생 
scroll 스크롤바를 조작할 때 발생 
error 에러가 발생했을 때 발생 

2) 키보드 이벤트 
keydown 키를 눌렀을 때 발생 
keyup 키를 눌렀다가 뗐을 때 발생 
keypress 사용자가 눌렀던 키의 문자가 입력되었을 때 발생 

3) 마우스 이벤트 
click 객체를 클릭했을 때 발생 
dblclick 객체를 더블클릭했을 때 발생 
mousedown 마우스를 클릭했을 때 발생 
mouseout 마우스가 특정 객체 밖으로 나갔을 때 발생 
mouseover 마우스가 특정 객체 위로 올려졌을 때 발생 
mousemove 마우스가 움직였을 때 발생 
mouseup 마우스에서 손을 뗏을 때 발생 

4) 포커스 이벤트 
focus 객체에 focus가 되었을 때 발생 
blur 객체가 focus를 잃었을 때 발생 

5) 폼 이벤트 
input input, textarea 요소 값이 변경되었을 때 발생 
change 선택 상자, 체크박스, 라디오 버튼의 상태가 변경되었을 때 발생 
select 텍스트를 선택을 했을 때 발생 
reset 리셋 버튼을 눌렀을 때 발생 
submit 사용자가 버튼키 등을 활용하여 폼을 전송할 때 발생 
cut/copy/paste 사용자가 폼필드의 콘텐츠를 잘라내기/복사/붙여 넣기 했을 때 발생
*/

const submitBtn = document.querySelector('.submit-btn');
const form = document.querySelector('form');
const title = document.querySelector('h2');
const emailInput = document.getElementById('email');

//Click event
/*
submitBtn.addEventListener('click', eventHandler);
submitBtn.addEventListener('dblclick', eventHandler);

// mousedown, mouseup, click
submitBtn.addEventListener('mouseup', eventHandler);
submitBtn.addEventListener('mouseenter', eventHandler);
submitBtn.addEventListener('mouseleave', eventHandler);
submitBtn.addEventListener('mousemove', eventHandler);
*/

// Form event
form.addEventListener('submit', eventHandler)
emailInput.addEventListener('keydown', eventHandler);
emailInput.addEventListener('keyup', eventHandler);
emailInput.addEventListener('keypress', eventHandler);
emailInput.addEventListener('focus', eventHandler);
emailInput.addEventListener('blur', eventHandler);
emailInput.addEventListener('cut', eventHandler);
emailInput.addEventListener('paste', eventHandler);
emailInput.addEventListener('input', eventHandler);

function eventHandler(event) {
    if(event.type === 'submit') {
        event.preventDefault();
    }
    console.log(`event type: ${event.type}`);
    //title.textContent= `MouseX: ${event.clientX}, MouseY: ${event.clientY}`;
    title.textContent = event.target.value;
}