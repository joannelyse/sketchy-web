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
const pencilToolBtn = document.querySelector('[data-tool="draw"]');

colorButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    brushColor = btn.dataset.color;
    colorButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTool = 'draw';
    toolButtons.forEach(b => b.classList.remove('active'));
    pencilToolBtn.classList.add('active');
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

function showConfirmationMessage() {
  const messages = [
    'Your masterpiece has been sent ✨',
    'Submission received! The gallery awaits 🖌️',
    'Your art just brightened our inbox! 📬',
    'Sketch sent! Very creative Picasso 👨‍🎨.'
  ];
  const confirmation = document.getElementById('confirmation');
  confirmation.textContent = messages[Math.floor(Math.random() * messages.length)];
  confirmation.style.display = 'block';
  confirmation.style.position = 'fixed';
  confirmation.style.top = '50%';
  confirmation.style.left = '50%';
  confirmation.style.transform = 'translate(-50%, -50%)';
  confirmation.style.background = '#fff0f6';
  confirmation.style.border = '2px solid #ff99cc';
  confirmation.style.padding = '1rem 2rem';
  confirmation.style.borderRadius = '12px';
  confirmation.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
  confirmation.style.zIndex = '1000';

  const ding = new Audio('ding.mp3');
  ding.volume = 0.3;
  ding.play();
}

function submitDrawing() {
  const title = document.getElementById('title').value || 'Untitled';
  const author = document.getElementById('author').value || 'Anonymous';
  const imageData = canvas.toDataURL('image/png');

  window.scrollTo({ top: 0, behavior: 'smooth' });
  showConfirmationMessage();

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://getform.io/f/bllzkogb';

  form.appendChild(createHiddenInput('Title', title));
  form.appendChild(createHiddenInput('Author', author));
  form.appendChild(createHiddenInput('Image', imageData));
  form.appendChild(createHiddenInput('redirect', 'https://joannelyse.github.io/sketchy-web/'));

  document.body.appendChild(form);
  form.submit();
}

function createHiddenInput(name, value) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  return input;
}
