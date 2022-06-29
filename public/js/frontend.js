const socket = io();

socket.on ('connect', () => {
  console.log('Connected to server');
});

const btn = document.querySelector('#create-room-btn');
btn.addEventListener('click', function (e) {
    const roomId = document.querySelector("#create-portal").value.trim();
    //create ws room on server first
    console.log("ROOM ID", roomId);

    socket.emit('create', roomId);
});