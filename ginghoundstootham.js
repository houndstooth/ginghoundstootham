//setup canvas

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');


//user settings

ctx.lineWidth = 1;
const SCALE = 25;
const DIMENSION = 32;
WIDTH = HEIGHT = canvas.width = canvas.height = SCALE * DIMENSION;
const STRIPE_COUNT = triangularNumber(DIMENSION + 1);
const COLOR_A = "#000";
const COLOR_B = "#fff";
const THINNING_RATE = 1/2;

function triangularNumber(n) {
  return n * (n + 1) / 2;
}


//populate stripes

function inverseTriangularNumber(n) {
  return 0.5 * Math.sqrt(8 * n + 1) - 0.5;
}

var stripes = [];
for (var n = 0; n < STRIPE_COUNT; n++) {
  stripes.push(inverseTriangularNumber(n) / THINNING_RATE);
}


//from the master stripes, build and kick off each diagonal of striped squares

var i = 0;
var thisDiagonalsStripeEdgeModuli = [0];
stripes.forEach(function(stripe) {
  if (stripe >= i + 2) {
    drawStripedSquareDiagonal(thisDiagonalsStripeEdgeModuli, i);
    thisDiagonalsStripeEdgeModuli = [0];
    i += 2;
  }
  thisDiagonalsStripeEdgeModuli.push(stripe % 2);
});


//for a given diagonal, draw each of its striped squares

function drawStripedSquareDiagonal(thisDiagonalsStripeEdgeModuli, diagonal) {
  for (var x = diagonal; x >= 0; x--) {
    var y = diagonal - x;
    drawStripedSquare(x, y, thisDiagonalsStripeEdgeModuli)
  }
}


//draw a single striped square

var color = COLOR_A;
function switchColor() {
  color = color === COLOR_A ? COLOR_B : COLOR_A;
}

function drawStripedSquare(x, y, thisDiagonalsStripeEdgeModuli) {
  thisDiagonalsStripeEdgeModuli.forEach(function(curModulus, index) {
    switchColor();
    ctx.fillStyle = color;
    var nextModulus = thisDiagonalsStripeEdgeModuli[index + 1] || 2;
    ctx.beginPath();
    ctx.moveTo((x + curModulus) * SCALE, y * SCALE);
    ctx.lineTo((x + nextModulus) * SCALE, y * SCALE);
    ctx.lineTo(x * SCALE, (y + nextModulus) * SCALE)
    ctx.lineTo(x * SCALE, (y + curModulus) * SCALE);
    ctx.closePath();
    ctx.fill();
  })
  if (thisDiagonalsStripeEdgeModuli.length % 2 === 0) switchColor();
}


//draw the solid squares

for (var x = 0; x < DIMENSION; x++) {
  for (var y = 0; y < DIMENSION; y++) {
    if (x % 2 !== 0 && y % 2 === 0) solidSquare(COLOR_A);
    if (x % 2 === 0 && y % 2 !== 0) solidSquare(COLOR_B);
  }
}

function solidSquare(color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(x * SCALE, y * SCALE, SCALE, SCALE);
  ctx.fill();
}
