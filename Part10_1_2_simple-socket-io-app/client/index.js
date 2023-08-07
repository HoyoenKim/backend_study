const socket = io('ws://localhost:8080');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('message2', (message) => {
    const element = document.createElement('li');
    element.innerText = message;
    document.querySelector('ul').appendChild(element);
})

document.querySelector('button').onclick = () => {
    const text = document.querySelector('input').value;
    socket.emit('message1', text);
}