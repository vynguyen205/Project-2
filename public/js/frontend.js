//DOM ELEMENTS
// create user
const createUser = document.getElementById('create-username');
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
        user_name,
      }),
    });

    console.log(fetchData);
    const dataReturn = await fetchData.json();
    console.log(dataReturn);

    //checkiing for null values
    if (room_name === '' || roomPassword === '') {
      alert('Please enter a room name and password');
    }
  } catch (err) {
    console.log(err);
  }
  //redirect to the room
  // window.location.href = `api/rooms/${room_name}`;
};

const joinRoomFunction = async () => {
  const room_name = joinRoomName.value.trim();
  const roomPassword = joinRoomPass.value.trim();

  const fetchData = await fetch(`api/rooms/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      roomName: room_name,
      password: roomPassword,
    }),
  });
  console.log(fetchData);
  const dataReturn = await fetchData.json();
  console.log(dataReturn);

  socket.emit('joinRoom', { room_name, roomPassword });
  //checkiing for null values
  if (room_name === '' || roomPassword === '') {
    alert('Please enter a room name and password');
  }
  //redirect to the room
  // window.location.href = `api/rooms/${room_name}`;
};

// Create new user
// const newUserFunction = async (e) => {
//   e.preventDefault();
//   // const new_user = createUser.value.trim();
//   console.log(new_user);

//   //TODO - grab socket id, send with payload
//   const fetchData = await fetch(`/api/users/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       username: new_user,
//       //need socket id here in the body
//     }),
//   });
//   console.log(fetchData);
//   const dataReturn = await fetchData.json();
//   console.log(dataReturn);

//   socket.emit();

//   socket.emit('joinRoom', dataReturn);
//   if (users === '') {
//     alert('Please enter a username');
//   }
// };

// createRoomBtn.addEventListener('click', newUserFunction);
createRoomBtn.addEventListener('click', createRoom);

joinRoomBtn.addEventListener('click', joinRoomFunction);
