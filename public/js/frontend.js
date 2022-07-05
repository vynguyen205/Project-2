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
const socket = io();

// get data from server to create a new room 
const createRoom = async () => {
  const user_name = createUser.value.trim();
  const room_name = createRoomName.value.trim();
  const roomPassword = createRoomPassword.value.trim();

  const fetchData = await fetch(`api/rooms/`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            roomName: room_name,
            password: roomPassword,
          })
        })
        console.log(fetchData)
        const dataReturn = await fetchData.json();
        console.log(dataReturn);


  socket.emit('createRoom', {room_name, roomPassword});
  //checkiing for null values
  if (room_name === '' || roomPassword === '') {
    alert('Please enter a room name and password'); 
  }
  //redirect to the room
  window.location.href = `api/rooms/${room_name}`;

}

const joinRoomFunction = async () => {
  const room_name = joinRoomName.value.trim();
  const roomPassword = joinRoomPass.value.trim();

  const fetchData = await fetch(`api/rooms/`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            roomName: room_name,
            password: roomPassword,
          })
        })
        console.log(fetchData)
        const dataReturn = await fetchData.json();
        console.log(dataReturn);

  socket.emit('Join Room', {room_name, roomPassword});
  //checkiing for null values
  if (room_name === '' || roomPassword === '') {
    alert('Please enter a room name and password'); 
  }
  //redirect to the room
  window.location.href = `api/rooms/${room_name}`;
}

createRoomBtn.addEventListener('click', createRoom);
joinRoomBtn.addEventListener('click', joinRoomFunction);

  // Create new user 
const newUserFunction = async () => {
  const new_user = createUser.value.trim();

  const fetchData = await fetch(`/api/users/`, { 
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: new_user,
      socket_id: new_user.socket_id,
      room_id: new_user.room_id
    })
  })
  console.log(fetchData)
  const dataReturn = await fetchData.json();
  console.log(dataReturn);

  socket.emit('Create New User', {users});
  if (users === '') {
    alert ("Please enter a username")
  }
}

createRoomBtn.addEventListener('click', newUserFunction);
