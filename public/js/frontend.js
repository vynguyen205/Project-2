const socket = io();

socket.on ('connect', () => {
  console.log('⛓ Connected to server');
});



// button connecting to backend to create a room and send the room id to the frontend
const btn = document.querySelector('#create-room-btn');
const username = document.querySelector('#username').value.trim();
btn.addEventListener('click', function (e) {
    const roomId = document.querySelector("#create-portal").value.trim();
    //create ws room on server first
    console.log("ROOM ID", roomId);

    socket.emit('create', roomId);
});

const randomRoomBtn = document.querySelector('#random-room-btn');
randomRoomBtn.addEventListener('click', function (e) {
    const randomRoomId = 
    socket.emit('create', randomRoomId);
  });