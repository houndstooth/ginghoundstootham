//setup canvas

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');


//user settings

ctx.lineWidth = 1;
const SCALE = 50;
const DIMENSION = 16;
WIDTH = HEIGHT = canvas.width = canvas.height = SCALE * DIMENSION;
const STRIPE_COUNT = 3;
const COLOR_A = "#000";
const COLOR_B = "#fff";


//draw the solid squares

for (var x = 0; x < DIMENSION; x++) {
  for (var y = 0; y < DIMENSION; y++) {

    //switcherooey mode, where striped are by diagonals running top left to bottom right
    if (x % 4 === y % 4) stripedSquare(COLOR_A, x, y);
    if (Math.abs(x % 4 - y % 4) === 2) stripedSquare(COLOR_B, x, y);

    if (x % 2 !== 0 && y % 2 === 0) solidSquare(COLOR_A, x, y);
    if (x % 2 === 0 && y % 2 !== 0) solidSquare(COLOR_B, x, y);

    //standard mode
    // if (x % 2 === 0 && y % 2 === 0) stripedSquare(COLOR_A, x, y);
    // if (x % 2 !== 0 && y % 2 !== 0) stripedSquare(COLOR_B, x, y);
  }
}

function solidSquare(color, x, y) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(x * SCALE, y * SCALE, SCALE, SCALE);
  ctx.fill();
}

function stripedSquare(color, x, y) {
  solidSquare(color, x, y);
  ctx.fillStyle = switchColor(color);

  //BY AREA
  ctx.beginPath();
  ctx.moveTo(x * SCALE, y * SCALE);
  ctx.lineTo((x + Math.sqrt(2)/2) * SCALE, y * SCALE);
  ctx.lineTo(x * SCALE, (y + Math.sqrt(2)/2) * SCALE);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo((x + 1) * SCALE, (y + 1 - Math.sqrt(2)/2) * SCALE);
  ctx.lineTo((x + 1) * SCALE, (y + 1) * SCALE);
  ctx.lineTo((x + 1 - Math.sqrt(2)/2) * SCALE, (y + 1) * SCALE);
  ctx.closePath();
  ctx.fill();


  //BY STRIPE WIDTH
  // ctx.beginPath();
  // ctx.moveTo(x * SCALE, y * SCALE);
  // ctx.lineTo((x + (2/3)) * SCALE, y * SCALE);
  // ctx.lineTo(x * SCALE, (y + (2/3)) * SCALE);
  // ctx.closePath();
  // ctx.fill();
  //
  // ctx.beginPath();
  // ctx.moveTo((x + 1) * SCALE, (y + 1 - (2/3)) * SCALE);
  // ctx.lineTo((x + 1) * SCALE, (y + 1) * SCALE);
  // ctx.lineTo((x + 1 - (2/3)) * SCALE, (y + 1) * SCALE);
  // ctx.closePath();
  // ctx.fill();
}

function switchColor(color) {
  return color === COLOR_A ? COLOR_B : COLOR_A;
}
