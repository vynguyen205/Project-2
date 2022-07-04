//DOM ELEMENTS
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
socket.on ('connection', () => {
  console.log('⛓ Connected to server');
  //this creates a user
});
socket.emit('💃🏻 Join Server', socket.id);

// get data from server to create a new room 
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


// NEW USER MODAL WINDOW

  // Original JavaScript code by Chirp Internet: chirpinternet.eu
  // Please acknowledge use of this code by including this header.
var checkForm = function(e)
  {
    var form = (e.target) ? e.target : e.srcElement;
    if(form.name.value == "") {
      alert("Please enter your username");
      form.name.focus();
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      return;
    }
  };

  var modal_init = function() {

    var modalWrapper = document.getElementById("modal_wrapper");
    var modalWindow  = document.getElementById("modal_window");

    var openModal = function(e)
    {
      modalWrapper.className = "overlay";
      var overflow = modalWindow.offsetHeight - document.documentElement.clientHeight;
      if(overflow > 0) {
        modalWindow.style.maxHeight = (parseInt(window.getComputedStyle(modalWindow).height) - overflow) + "px";
      }
      modalWindow.style.marginTop = (-modalWindow.offsetHeight)/2 + "px";
      modalWindow.style.marginLeft = (-modalWindow.offsetWidth)/2 + "px";
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
    };

    var closeModal = function(e)
    {
      modalWrapper.className = "";
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
    };

    var clickHandler = function(e) {
      if(!e.target) e.target = e.srcElement;
      if(e.target.tagName == "DIV") {
        if(e.target.id != "modal_window") closeModal(e);
      }
    };

    var keyHandler = function(e) {
      if(e.keyCode == 27) closeModal(e);
    };

    if(document.addEventListener) {
      document.getElementById("modal_open").addEventListener("click", openModal, false);
      document.getElementById("modal_close").addEventListener("click", closeModal, false);
      document.addEventListener("click", clickHandler, false);
      document.addEventListener("keydown", keyHandler, false);
    } else {
      document.getElementById("modal_open").attachEvent("onclick", openModal);
      document.getElementById("modal_close").attachEvent("onclick", closeModal);
      document.attachEvent("onclick", clickHandler);
      document.attachEvent("onkeydown", keyHandler);
    }

    if(document.addEventListener) {
      document.getElementById("modal_feedback").addEventListener("submit", checkForm, false);
      document.addEventListener("DOMContentLoaded", modal_init, false);
    } else {
      document.getElementById("modal_feedback").attachEvent("onsubmit", checkForm);
      window.attachEvent("onload", modal_init);
    }
  };

  // Create new user 
const newUserFunction = async () => {
  const new_user = createNewUser.value.trim();

  const fetchData = await fetch(`/api/users/`, { 
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newUser: new_user,
    })
  })
  console.log(fetchData)
  const dataReturn = await fetchData.json();
  console.log(dataReturn);

  socket.emit('Create New User', {new_user});
  if (new_user === '') {
    alert ("Please enter a username")
  }
}
window.location.href = `api/users/${new_user}`;


newUserBtn.addEventListener('click', newUserFunction);
