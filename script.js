// Global Variables for game
const pacArray = [
['PacMan1.png', 'PacMan2.png'],
['PacMan3.png', 'PacMan4.png'],
['PacManDownOpen.png', 'PacManDownClosed.png'],
['PacManUpOpen.png', 'PacManUpClosed.png']
];
var runStatus = false;
var posX = 0;
var posY = 0;
var direction = 'left';
var speedX = 0;
var speedY = 0;
var focus = 0;
var picIndex = 2;
const container = document.getElementById('container').getBoundingClientRect();
const limitX = container.width;
const limitY = container.height;


// Button input response
function input(input) {
switch (input) {
  case 'left':
    speedX = 10;
    speedY = 0;
    direction = input;
    picIndex = 1;
    break;
  case 'right':
    speedX = 10;
    speedY = 0;
    direction = input;
    picIndex = 0;
    break;
  case 'up':
    speedX = 0;
    speedY = 10;
    direction = input;
    picIndex = 3;
    break;
  case 'down':
    speedX = 0;
    speedY = 10;
    direction = input;
    picIndex = 2;
    break;
}
if(!runStatus) {
  runStatus = !runStatus;
  setInterval(Run, 50);
}
}

// Moves images by changing image css style position
function move() {
const img = document.getElementById("PacMan");
const imgWidth = img.width;
switch (direction) {
  case 'left':
    checkLimits(direction, imgWidth, posX, limitX);
    posX -= speedX;
    img.style.left = posX + "px";
    break;
  case 'right':
    checkLimits(direction, imgWidth, posX, limitX);
    posX += speedX;
    img.style.left = posX + 'px';
    break;
  case 'up':
    checkLimits(direction, imgWidth, posY, limitY);
    posY -= speedY;
    img.style.top = posY + "px";
    break;
  case 'down':
    checkLimits(direction, imgWidth, posY, limitY);
    posY += speedY;
    img.style.top = posY + 'px';
    break;
}
}

// Checks limits and adjusts direction by changing inputs
function checkLimits(direction, imgWidth, pos, limit2d) {
if (direction === 'left' || direction === 'right') {
  if (pos + imgWidth * 1.05 > limit2d) {
    input('left');
  } else if (pos < imgWidth * 0.25) {
    input('right');
  }
}
if (direction === 'up' || direction === 'down') {
  if(pos + imgWidth * 1.05 > limit2d) {
    input('up');
  } else if (pos < imgWidth * 0.25) {
    input('down');
  }
}
}

// Calls the move function and 'focus' alternates between images
function Run() {
const img = document.getElementById("PacMan");
focus = (focus + 1) % 2; // Alternates 0 & 1
img.src = pacArray[picIndex][focus];
move();
}

// Keybind variables
const buttonReload = document.getElementById('buttonReload');
const buttonLeft = document.getElementById('buttonLeft');
const buttonRight = document.getElementById('buttonRight');
const buttonUp = document.getElementById('buttonUp');
const buttonDown = document.getElementById('buttonDown');

function keyPress(event) {
if(event.key.includes('ArrowLeft')) {
  event.preventDefault();
  buttonLeft.classList.add('hover');
  input('left');
}
if(event.key.includes('ArrowRight')) {
  event.preventDefault();
  buttonRight.classList.add('hover');
  input('right');
}
if(event.key.includes('ArrowUp')) {
  event.preventDefault();
  buttonUp.classList.add('hover');
  input('up');
}
if(event.key.includes('ArrowDown')) {
  event.preventDefault();
  buttonDown.classList.add('hover');
  input('down');
}
if(event.code.includes('KeyR')) {
  event.preventDefault();
  buttonReload.classList.add('hover');
  setTimeout(windowReload, 500);
}
}

function windowReload() {
window.location.reload();
}

window.addEventListener('keydown', keyPress);
document.body.addEventListener('keyup', (e) => {
buttonReload.classList.remove('hover');
buttonLeft.classList.remove('hover');
buttonRight.classList.remove('hover');
buttonUp.classList.remove('hover');
buttonDown.classList.remove('hover');
})