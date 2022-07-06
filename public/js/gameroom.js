//DOM ELEMENTS
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// const socket = io();

socket.on('newId', (message) => {
  console.log('testing', message);
});

socket.on('message', (message) => {
  outputMessage(message);
  console.log(message);

  //scroll to the bottom of the chat
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.emit('💃🏻 Join Server', socket.id);

//message event
chatForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  //grabbing typed message from the input in html
  const message = e.target.elements.msg.value;
  console.log(message);

  socket.emit('Chat Message', message);

  //clear the input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//output message to the DOM
const outputMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
};
