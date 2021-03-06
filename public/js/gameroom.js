//DOM ELEMENT
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const currentPlayers = document.getElementById('players');
const getWords = document.getElementById('words');
const timeEl = document.querySelector('.timeDisplay');
const whoIsDrawing = document.querySelector('.userInfo');

let time = 60;
let countdown;

//when a user is connected a console log is displaying the user's id.

//message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  //scroll to the bottom of the chat
  if (chatMessages) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

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
  if (typeof message === 'string') {
    //get time in h:mm a format use Date()
    const time = new Date().toLocaleTimeString();
    div.innerHTML = `<p class="meta">DÜDL Bot ${time
      .replace(/:\d{2} /, '')
      .toLowerCase()}</p><p>${message}</p>`;
  } else {
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    // console.log(div)
  }
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

//stop the game and emit to the server that the game is over and the timer should stop
socket.on('stopGame', (data) => {
  let user_name = window.location.search.split('=')[1];
  let room_name = window.location.pathname.split('/')[3];
  socket.emit('stopGame', JSON.stringify({ room_name, user_name }));
  clearInterval(countdown);
  timeEl.innerHTML = '🎉';
  whoIsDrawing.innerHTML = 'GAME OVER';
  //stop the timer when the user guesses the word right
});

socket.on('word selected', (data) => {
  //write logic for starting countdown or something on FE

  console.log('this person is drawing -', data.artist);

  whoIsDrawing.innerHTML = `🎨 ${data.artist} drawing`;

  startTimer();
});

//start timer for drawing
const startTimer = () => {
  countdown = setInterval(() => {
    time--;
    timeEl.innerHTML = `⏱ ${time}`;

    if (time <= 0) {
      timeEl.innerHTML = 'GAME OVER';
      clearInterval(countdown);
    }
  }, 1000);
};

//display random word and emit to one user only
const displayRandomWord = () => {
  const user_name = window.location.search.split('=')[1];
  const room_name = window.location.pathname.split('/')[3];
  console.log('clicked randomword');

  //if the button is clicked, then hide it when the user is drawing
  document.querySelector('.newword').style.display = 'none';
  socket.emit('randomWord', JSON.stringify({ room_name, user_name }));
};

document
  .querySelector('.newword')
  ?.addEventListener('click', displayRandomWord);

//get random words to display to the dom
// const randomWords = () => {
//   getData(`api/words/`).then((data) => {
//     console.log(data);

//     const randomWord = data[Math.floor(Math.random() * data.length)];
//     console.log(randomWord);
//     randomWord.forEach((word) => {
//       const li = document.createElement('li');
//       li.innerHTML = `<p>${word.word}</p>`;
//       getWords.appendChild(li);
//     });
//   });
// };

// randomWords();
