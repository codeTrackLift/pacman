// Global Variables: Pac-Man
const pacArray = [
  ['../pics/PacMan1.png', '../pics/PacMan2.png'],
  ['../pics/PacMan3.png', '../pics/PacMan4.png'],
  ['../pics/PacManDownOpen.png', '../pics/PacManDownClosed.png'],
  ['../pics/PacManUpOpen.png', '../pics/PacManUpClosed.png']
];
var picIndex = 2;
var posX = 0;
var posY = 0;
var direction = 'left';
var speedX = 0;
var speedY = 0;
var focus = 0;
var runStatus = false;

// Global Variables: Container
var container = document.getElementById('container');
var containerSize = document.getElementById('container').getBoundingClientRect();
var limitX = containerSize.width;
var limitY = containerSize.height;
const welcomeMessage = document.getElementById('welcomeMessage');

// Global Variables: Ball
var ball = document.getElementById('ball');
var score = 0;
var velocityX = 5;
var velocityY = 5;
var speed = 50;
var positionX = getRandom(containerSize.width - 20);
var positionY = getRandom(containerSize.height - 20);
var limitX1 = 10;
var limitX2 = containerSize.width - 20;
var limitY1 = 10;
var limitY2 = containerSize.height - 20;

// Global Variables: Keybind
const buttonReload = document.getElementById('buttonReload');
const buttonLeft = document.getElementById('buttonLeft');
const buttonRight = document.getElementById('buttonRight');
const buttonUp = document.getElementById('buttonUp');
const buttonDown = document.getElementById('buttonDown');

// Utility function: Random number generator
function getRandom(scale) {
  return Math.floor(Math.random() * scale);
}

// Utility function: Window reload
function windowReload() {
  window.location.reload();
}

// Utility function: Force window reload upon screen orientation change
window.onorientationchange = function (event) {
  windowReload();
};

// User: Button input
function input(input) {
  direction = input;
  switch (input) {
    case 'left':
      speedX = 10;
      speedY = 0;
      picIndex = 1;
      break;
    case 'right':
      speedX = 10;
      speedY = 0;
      picIndex = 0;
      break;
    case 'up':
      speedX = 0;
      speedY = 10;
      picIndex = 3;
      break;
    case 'down':
      speedX = 0;
      speedY = 10;
      picIndex = 2;
      break;
  }
  if (!runStatus) {
    runStatus = !runStatus;
    welcomeMessage.style.opacity = 0;
    setInterval(Run, 50);
    setInterval(moveBall2D, speed);
  }
}

// User: Key inputs
function keyPress(event) {
  if (event.key.includes('ArrowLeft')) {
    event.preventDefault();
    buttonLeft.classList.add('hover');
    input('left');
  }
  if (event.key.includes('ArrowRight')) {
    event.preventDefault();
    buttonRight.classList.add('hover');
    input('right');
  }
  if (event.key.includes('ArrowUp')) {
    event.preventDefault();
    buttonUp.classList.add('hover');
    input('up');
  }
  if (event.key.includes('ArrowDown')) {
    event.preventDefault();
    buttonDown.classList.add('hover');
    input('down');
  }
  if (event.code.includes('KeyR')) {
    event.preventDefault();
    buttonReload.classList.add('hover');
    setTimeout(windowReload, 250);
  }
}

// User: Key hover effects
window.addEventListener('keydown', keyPress);
document.body.addEventListener('keyup', (e) => {
  buttonReload.classList.remove('hover');
  buttonLeft.classList.remove('hover');
  buttonRight.classList.remove('hover');
  buttonUp.classList.remove('hover');
  buttonDown.classList.remove('hover');
})

// Pac-Man: Run function starts movement and 'focus' alternates between images
function Run() {
  const img = document.getElementById("PacMan");
  focus = (focus + 1) % 2; // Alternates 0 & 1
  img.src = pacArray[picIndex][focus];
  move();
}

// Pac-Man: Moves by changing image css style position
function move() {
  const img = document.getElementById("PacMan");
  const imgWidth = img.width;
  checkCollision(imgWidth);
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

// Pac-Man: Checks collision with ball using supplied image width
function checkCollision(imgWidth) {
  let ballX = parseInt(ball.style.left); 
  let ballY = parseInt(ball.style.top); 
  imgWidth *= 0.8;
  if ((ballX < posX + imgWidth &&
    ballX > posX - imgWidth) &&
    (ballY < posY + imgWidth &&
    ballY > posY - imgWidth)) {
    document.getElementById('scoreNumber').innerText = score;
    ball.remove();
    container.classList.add('shake');
    container.addEventListener('animationend', () => {
      container.classList.remove('shake'); 
      }, { once: true });
    score++;
    setTimeout(respawnBall, 1000);
  }
}

// Pac-Man: Checks limits and adjusts direction by changing inputs
function checkLimits(direction, imgWidth, pos, limit2d) {
  if (direction === 'left' || direction === 'right') {
    if (pos + imgWidth * 1.05 > limit2d) {
      input('left');
    } else if (pos < imgWidth * 0.25) {
      input('right');
    }
  }
  if (direction === 'up' || direction === 'down') {
    if (pos + imgWidth * 1.05 > limit2d) {
      input('up');
    } else if (pos < imgWidth * 0.25) {
      input('down');
    }
  }
}

// Ball: Spawn function, checks container size
function respawnBall() {
  container.appendChild(ball);
  velocityX++;
  velocityY++;
}

// Ball: 2D movement function using arrow syntax
const moveBall2D = () => {
  if (positionX < limitX1 ||
    positionX > limitX2) {
    velocityX *= -1;
  }
  if (positionY < limitY1 ||
    positionY > limitY2) {
    velocityY *= -1;
  }
  positionX += velocityX;
  positionY += velocityY;
  ball.style.left = positionX + 'px';
  ball.style.top = positionY + 'px';
}

// Ball: Random color function using arrow syntax
const randomColor = () => {
  let r = getRandom(255);
  let g = getRandom(255);
  let b = getRandom(255);
  let color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  ball.style.background = color;
}
setInterval(randomColor, 500); 