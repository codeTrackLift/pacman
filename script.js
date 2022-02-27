// Global Variables for game
const pacArray = [
  ['PacMan1.png', 'PacMan2.png'],
  ['PacMan3.png', 'PacMan4.png'],
  ['PacManDownOpen.png', 'PacManDownClosed.png'],
  ['PacManUpOpen.png', 'PacManUpClosed.png']
];
// const pillArray = ['rotate(-10deg)', 'rotate(10deg)'];
var focusPill = 0;
var runStatus = false;
var posX = 0;
var posY = 0;
var direction = 'left';
var speedX = 0;
var speedY = 0;
var focus = 0;
var picIndex = 2;
var container = document.getElementById('container');
var containerSize = document.getElementById('container').getBoundingClientRect();
var limitX = containerSize.width;
var limitY = containerSize.height;


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
  if (!runStatus) {
    runStatus = !runStatus;
    setInterval(Run, 50);
    setInterval(moveBall2D, speed);
  }
}

// Moves images by changing image css style position
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
      },
      { once: true }
      );
      setTimeout(scoreIncrease, 250);
      setTimeout(respawnBall, 1000);
    }
}

function scoreIncrease() {
  score++;
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
    if (pos + imgWidth * 1.05 > limit2d) {
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

window.onorientationchange = function (event) {
  windowReload();
};

// Ball section
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

function respawnBall() {
  container.appendChild(ball);
  velocityX++;
  velocityY++;
}

// 2D ball movement function using arrow syntax
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
  // const pill = document.getElementById("ball");
  // focusPill = (focusPill + 1) % 2; // Alternates 0 & 1
  // ball.style.transform = pillArray[focusPill];
}

// Random color function using arrow syntax
const randomColor = () => {
  var r = getRandom(255);
  var g = getRandom(255);
  var b = getRandom(255);
  var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  ball.style.background = color;
}
// setInterval(randomColor, 500); 

function getRandom(scale) {
  return Math.floor(Math.random() * scale);
}

// Ball initial size to match height/width, size limits, and growth/shrink rate
var size = 50;
var sizeMin = 25;
var sizeMax = 150;
var resizeRate = 10;

// Another arrow function to make the ball grow and shrink
const resizeBall = () => {
  if (size < sizeMin ||
    size > sizeMax) {
    resizeRate *= -1;
  }
  size += resizeRate;
  ball.style.height = `${size}px`;
  ball.style.width = `${size}px`;
}

// setInterval(resizeBall, 500);