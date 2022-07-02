const socket = io();

socket.on ('connect', () => {
  console.log('⛓ Connected to server');
  //this creates a user
  socket.emit('💃🏻 Join Server', {username: "chad", avatar: "something"})
});



// button connecting to backend to create a room and send the room id to the frontend
const btn = document.querySelector('#create-room-btn');

btn.addEventListener('click', function (e) {
    
    const fetchData = await fetch(`http://localhost:3001/${url}`,{
      method: "POST",
      // body: {
      //   username: variable,
      //   // ...allThecolsInTheModel-id
      // }
    })
    const dataReturn = await fetchData.json();

    socket.emit('create', roomId);
});

getData(`api/words`).then(data => console.log(data))

console.log("loaded")