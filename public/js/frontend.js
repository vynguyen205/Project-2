const socket = io();

socket.on ('connect', () => {
  console.log('⛓ Connected to server');
  //this creates a user
  socket.emit('💃🏻 Join Server', {username: "chad", avatar: "something"})
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
}

// btn.addEventListener('click', async function (e) {
  
//     const fetchData = await fetch(`http://localhost:3001/api/rooms/`,{
//       method: "POST",
//       body: {
//         roomName: createRoomName.value.trim(),
//         password: createRoomPassword.value.trim(),
//       }
//     })
//     const dataReturn = await fetchData.json();
//     console.log(dataReturn);
//     socket.emit('create', roomName);
// });

btn.addEventListener('click', createRoom);
