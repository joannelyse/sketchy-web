const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Mouse event handlers
canvas.addEventListener('mousedown', () => (drawing = true));
canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener('mouseout', () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener('mousemove', draw);

// Drawing function
function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// Clear canvas function
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}

// Submit function
function submitDrawing() {
  const title = document.getElementById('title').value || 'Untitled';
  const imageData = canvas.toDataURL('image/png');

  const form = document.createElement('form');
  form.action = 'https://formsubmit.co/joannamc2003@gmail.com';
  form.method = 'POST';

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
  redirectInput.name = '_redirect';
  redirectInput.value = 'https://joannelyse.github.io/sketchy-web/';

  const captchaInput = document.createElement('input');
  captchaInput.type = 'hidden';
  captchaInput.name = '_captcha';
  captchaInput.value = 'false';

  form.appendChild(titleInput);
  form.appendChild(imageInput);
  form.appendChild(redirectInput);
  form.appendChild(captchaInput);

  document.body.appendChild(form);

  document.getElementById('confirmation').textContent = '🎉 Thank you! Your masterpiece has been sent ✨';
  document.getElementById('confirmation').style.display = 'block';

  setTimeout(() => form.submit(), 300);
}