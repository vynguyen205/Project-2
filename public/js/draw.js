const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas?.getContext('2d');

const canvasOffsetX = canvas?.offsetLeft;
const canvasOffsetY = canvas?.offsetTop;

// canvas.width = window.innerWidth - canvasOffsetX;
// canvas.height = window.innerHeight - canvasOffsetY;

// receive from socket server
// setup = () => {
//   console.log(room_name, user_name);
//   socket = io.connect(
//     `http://localhost:3001/game/room_name/${room_name}?user_name=${user_name}`
//   );
//   socket.on('drawing-board', (data) => {
//     console.log(data);
//     line(data.x, data.y, 50, 50);
//   });
// };

socket.on('drawing-board', (data) => {
  console.log(data);
  draw({ clientX: data.x, clientY: data.y }, false);
});

if (canvas) {
  canvas.width = 500;
  canvas.height = 500;
}

//style of board
const drawingBoardDesign = () => {
  if (canvas) {
    canvas.style = `
    background-color: #fff;
    border-radius: 20px;
      `;
  }
};

let isPainting = false;
let lineWidth = 5;
let mouseX;
let mouseY;

toolbar?.addEventListener('click', (e) => {
  if (e.target.id === 'clear') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

toolbar?.addEventListener('change', (e) => {
  if (e.target.id === 'stroke') {
    ctx.strokeStyle = e.target.value;
  }
  if (e.target.id === 'lineWidth') {
    lineWidth = e.target.value;
  }
});

const draw = (e, isNotOffset = true) => {
  if (!isPainting && isNotOffset) {
    return;
  }
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineTo(
    e.clientX - canvas.offsetLeft * isNotOffset + window.scrollX * isNotOffset,
    e.clientY - canvas.offsetTop * isNotOffset + window.scrollY * isNotOffset
  );
  ctx.stroke();
  const room_name = window.location.pathname.split('/').slice(-1)[0];
  isNotOffset &&
    socket.emit('drawing', {
      x: e.clientX - canvas.offsetLeft + window.scrollX,
      y: e.clientY - canvas.offsetTop + window.scrollY,
      room_name,
    });
};

canvas?.addEventListener('mousedown', (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas?.addEventListener('mouseup', (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas?.addEventListener('mousemove', draw);
drawingBoardDesign();
