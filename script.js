const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let brushColor = '#000';
let brushSize = 3;

let currentTool = 'draw';

// Tool buttons
const toolButtons = document.querySelectorAll('.tool');
toolButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    toolButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (btn.classList.contains('eraser')) {
      brushColor = btn.dataset.color;
      currentTool = 'erase';
    } else if (btn.classList.contains('brush-toggle')) {
      document.querySelector('.brush-options').classList.toggle('hidden');
    } else {
      currentTool = btn.dataset.tool;
    }
  });
});

// Color buttons
const colorButtons = document.querySelectorAll('.color');
colorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    brushColor = btn.dataset.color;
    colorButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Brush size buttons
const sizeButtons = document.querySelectorAll('.brush-size');
sizeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    brushSize = parseInt(btn.dataset.size);
    sizeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Drawing handlers
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startDrawingTouch, { passive: false });
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);
canvas.addEventListener('touchmove', drawTouch, { passive: false });

function startDrawing(e) {
  drawing = true;
  draw(e);
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = brushColor;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function startDrawingTouch(e) {
  e.preventDefault();
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function drawTouch(e) {
  e.preventDefault();
  if (!drawing) return;
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = brushColor;

  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}

function submitDrawing() {
  const title = document.getElementById('title').value || 'Untitled';
  const imageData = canvas.toDataURL('image/png');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://getform.io/f/bllzkogb';

  const titleInput = document.createElement('input');
  titleInput.type = 'hidden';
  titleInput.name = 'Title';
  titleInput.value = title;

  const imageInput = document.createElement('input');
  imageInput.type = 'hidden';
  imageInput.name = 'Image';
  imageInput.value = imageData;

  const redirectInput = document.createElement('input');
  redirectInput.type = 'hidden';
  redirectInput.name = 'redirect';
  redirectInput.value = 'https://joannelyse.github.io/sketchy-web/';

  form.appendChild(titleInput);
  form.appendChild(imageInput);
  form.appendChild(redirectInput);

  document.body.appendChild(form);

  const messages = [
    'Your masterpiece has been sent ✨',
    'Submission received! The gallery awaits 🖌️',
    'Your art just brightened our inbox! 📬',
    'Sketch sent! Very creative Picasso 👨‍🎨.'
  ];

  document.getElementById('title').blur();
  const confirmation = document.getElementById('confirmation');
  confirmation.textContent = messages[Math.floor(Math.random() * messages.length)];

  const ding = new Audio('ding.mp3');
  ding.volume = 0.3;
  ding.play();

  confirmation.style.display = 'block';
  setTimeout(() => form.submit(), 300);
} 
