const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas?.getContext('2d');

const canvasOffsetX = canvas?.offsetLeft;
const canvasOffsetY = canvas?.offsetTop;

// canvas.width = window.innerWidth - canvasOffsetX;
// canvas.height = window.innerHeight - canvasOffsetY;

// receive from socket server
setup = () => {
  socket = io.connect(
    `http://localhost:3001/game/room_name/${room_name}?user_name=${user_name}`
  );
  socket.on('drawing', (data) => {
    console.log(data);
    ellipse(data.x, data.y, 50, 50);
  });
};

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

const draw = (e) => {
  if (!isPainting) {
    return;
  }
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();

  ellipse(mouseX, mouseY, 50, 50);
  socket.emit('drawing', { x: mouseX, y: mouseY });
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
