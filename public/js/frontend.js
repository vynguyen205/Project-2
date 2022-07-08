//DOM ELEMENts
const socket = io();
socket.io.connect(window.location.hostname);
// create user
const createUser = document.getElementById('create-username');
const joinUsername = document.getElementById('join-username');
//create room DOM elements
const createRoomBtn = document.querySelector('#create-room-btn');
const createRoomName = document.querySelector('#create-room-name');
const createRoomPassword = document.querySelector('#create-room-password');
//join room DOM elements
const joinRoomBtn = document.querySelector('#join-room-btn');
const joinRoomName = document.querySelector('#join-room-name');
const joinRoomPass = document.querySelector('#join-room-password');

//adds a new user to the server
let users = [];
let user;
// Confirm that user is connected to the server

// get data from server to create a new room
const createRoom = async () => {
  const user_name = createUser.value.trim();
  const room_name = createRoomName.value.trim();
  const roomPassword = createRoomPassword.value.trim();
  try {
    //go to his url create a room and new user
    const fetchData = await fetch(`api/rooms/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomName: room_name,
        password: roomPassword,
        socket_id: socket.id,
        user_name,
      }),
    });

    console.log(fetchData);
    const dataReturn = await fetchData.json();
    console.log(`FRONTEND ROOM CREATED`, dataReturn);
    user = user_name;
    //checkiing for null values
    if (room_name === '' || roomPassword === '') {
      alert('Please enter a room name and password');
    }
    //redirect to the room

    // socket.emit('createRoom', { room_name, user_name });
    window.location.href = `/game/room_name/${room_name}?user_name=${user_name}`;
  } catch (err) {
    console.log(err);
  }
};

const joinRoomFunction = async () => {
  const join_username = joinUsername.value.trim();
  const room_name = joinRoomName.value;
  const roomPassword = joinRoomPass.value.trim();

  try {
    const fetchData = await fetch(`api/rooms/${room_name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roomName: room_name,
        password: roomPassword,
        socket_id: socket.id,
        join_username,
      }),
    });

    console.log(fetchData);
    const dataReturn = await fetchData.json();
    console.log(`FRONTEND FETCHED DATA:`, dataReturn);
    user = join_username;

    //checkiing for null values
    if (room_name === '' || roomPassword === '') {
      alert('Please enter a room name and password');
    }
    //redirect to the room
    // alert(username);
    window.location.href = `/game/room_name/${room_name}?user_name=${join_username}`;
    socket.emit('join room', JSON.stringify({ room_name, join_username }));
    console.log(socket);
    // socket.emit('Chat Message', `comeshjitk`);
  } catch (err) {
    console.log(err);
  }
};

createRoomBtn?.addEventListener('click', createRoom);

joinRoomBtn?.addEventListener('click', joinRoomFunction);
