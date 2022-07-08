//DOM ELEMENT
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const currentPlayers = document.getElementById('players');

//when a user is connected a console log is displaying the user's id.

// const socket = io();
// socket.io.connect(window.location.hostname);
// socket.on('New User Connected:', (id) =>
//   console.log('New User Connected: ', id)
// );

//message from server
socket.on('message', (message) => {
  outputMessage(message);

  //scroll to the bottom of the chat
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

// socket.emit('💃🏻 Join Server', socket.id);

//message event
chatForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  //grabbing typed message from the input in html
  const message = e.target.elements.msg.value;
  console.log(message);
  // get the query string params for user_name
  const user_name = window.location.search.split('=')[1];
  const room_name = window.location.pathname.split('/')[3];
  console.log('user', user_name, room_name);
  socket.emit(
    'Chat Message',
    JSON.stringify({ user_name, message, room_name })
  );
  // { message, user_name: user }
  //clear the input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//output message to the DOM
const outputMessage = (message) => {
  const div = document?.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
  // console.log(div)
  document.querySelector('.chat-messages')?.appendChild(div);
};

setTimeout(() => {
  let join_username = window.location.search.split('=')[1];
  let room_name = window.location.pathname.split('/')[3];
  console.log('room', room_name);
  socket.emit('join room', JSON.stringify({ room_name, join_username }));
}, 1000);

// add users to the DOM
const userList = () => {
  const room_name = window.location.pathname.split('/')[3];
  //grab the room name from the url & get the room id
  getData(`api/rooms/${room_name}`).then((data) => {
    // console.log(data);
    const room_id = data.id;
    // console.log(room_id);
    //get the users in the room
    getData(`api/users/room_id/${room_id}`).then((data) => {
      console.log(data);
      //loop through the users and display them in the DOM
      data.forEach((user) => {
        const li = document.createElement('li');
        li.innerHTML = `<p>${user.username}</p>`;
        currentPlayers.appendChild(li);
      });
    });
  });
};

userList();

// currentPlayers.innerHTML = `
//   ${users.map((user) => `<li>${user.username}</li>`).join('')}`;
