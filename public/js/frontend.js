const socket = io();

socket.on ('connect', () => {
  console.log('⛓ Connected to server');
  //this creates a user
  socket.emit('💃🏻 Join Server', {username: "chad", avatar: "something"})
});



// button connecting to backend to create a room and send the room id to the frontend
const btn = document.querySelector('#create-room-btn');
// const createUsername = document.querySelector('#create-username').value.trim();
const createRoomName = document.querySelector('#create-room-name');
const createRoomPassword = document.querySelector('#create-room-password').value.trim();

btn.addEventListener('click', async function (e) {
  
    const fetchData = await fetch(`http://localhost:3001/api/rooms/`,{
      method: "POST",
      body: {
        roomName: createRoomName.value.trim(),
        password: createRoomPassword.value.trim(),
      }
    })
    const dataReturn = await fetchData.json();
    console.log(dataReturn);
    socket.emit('create', roomName);
});
