const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

WIDTH = HEIGHT = canvas.width = canvas.height = 800;
ctx.lineWidth = 1;
const SCALE = 50;
const DIMENSION = 16;
const STRIPE_COUNT = triangularNumber(DIMENSION + 1);
const COLOR_A = "#000";
const COLOR_B = "#fff";

function triangularNumber(n) {
  return n * (n + 1) / 2;
}

function inverseTriangularNumber(n) {
  return 2 * (0.5 * Math.sqrt(8 * n + 1) - (1/2));
}

var stripes = [];
for (var n = 0; n < STRIPE_COUNT; n++) {
  stripes.push(inverseTriangularNumber(n));
}

var i = 0;
var thisDiagonalsStripeEdgeModuli = [0];
var color = COLOR_A;

stripes.forEach(function(stripe) {
  if (stripe >= i + 2) {
    // switchColor();
    drawStripedSquareDiagonal(thisDiagonalsStripeEdgeModuli, i);
    thisDiagonalsStripeEdgeModuli = [0];
    i += 2;
  }
  thisDiagonalsStripeEdgeModuli.push(stripe % 2);
});

function drawStripedSquareDiagonal(thisDiagonalsStripeEdgeModuli, diagonal) {
  for (var x = diagonal; x >= 0; x--) {
    var y = diagonal - x;
    // switchColor();
    drawStripedSquare(x, y, thisDiagonalsStripeEdgeModuli)
  }
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

for (var x = 0; x < DIMENSION; x++) {
  for (var y = 0; y < DIMENSION; y++) {
    if (x % 2 === 0 && y % 2 !== 0) solidSquare(COLOR_A);
    if (x % 2 !== 0 && y % 2 === 0) solidSquare(COLOR_B);
  }
}

function solidSquare(color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(x * SCALE, y * SCALE, SCALE, SCALE);
  ctx.fill();
}

function switchColor() {
  color = color === COLOR_A ? COLOR_B : COLOR_A;
}
