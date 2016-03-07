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
var THINNING_RATE = 1/4;
const FRAME_RATE = 1000/60;

function triangularNumber(n) {
  return n * (n + 1) / 2;
}


// main loop

setInterval(function() {


  // animate

  THINNING_RATE = THINNING_RATE * 1.001;


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
  stripes.forEach(function(stripe, index) {
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

  function switchColor(color) {
    return color === COLOR_A ? COLOR_B : COLOR_A;
  }

  function drawStripedSquare(x, y, thisDiagonalsStripeEdgeModuli) {
    var color = COLOR_A;
    thisDiagonalsStripeEdgeModuli.forEach(function(curModulus, index) {
      ctx.fillStyle = color;
      var nextModulus = thisDiagonalsStripeEdgeModuli[index + 1] || 2;
      ctx.beginPath();
      ctx.moveTo((x + curModulus) * SCALE, y * SCALE);
      ctx.lineTo((x + nextModulus) * SCALE, y * SCALE);
      ctx.lineTo(x * SCALE, (y + nextModulus) * SCALE)
      ctx.lineTo(x * SCALE, (y + curModulus) * SCALE);
      ctx.closePath();
      ctx.fill();
      color = switchColor(color);
    })
  }


  //draw the solid squares

  for (var x = 0; x < DIMENSION; x++) {
    for (var y = 0; y < DIMENSION; y++) {
      if (x % 2 !== 0 && y % 2 === 0) solidSquare(COLOR_A, x, y);
      if (x % 2 === 0 && y % 2 !== 0) solidSquare(COLOR_B, x, y);
    }
  }

  function solidSquare(color, x, y) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x * SCALE, y * SCALE, SCALE, SCALE);
    ctx.fill();
  }


}, FRAME_RATE);
