// const res = require("express/lib/response");

// const { redirect } = require("express/lib/response");

const socket = io();

socket.on ('connect', () => {
  console.log('⛓ Connected to server');
  //this creates a user
  // socket.emit('💃🏻 Join Server', {username: "chad", avatar: "something"})
});



//adds a new user to the server
let users = [];

// button connecting to backend to create a room and send the room id to the frontend
const btn = document.querySelector('#create-room-btn');
// const createUsername = document.querySelector('#create-username').value.trim();
const createRoomName = document.querySelector('#create-room-name');
const createRoomPassword = document.querySelector('#create-room-password');

const createRoom = async () => {
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
  } else if 
  //checking for duplicate room names
  (room_name === room_name) {
    alert('Room name already exists');
  } else {
  //redirect to the room
  window.location.href = `api/rooms/${room_name}`;
  }

}


btn.addEventListener('click', createRoom);
