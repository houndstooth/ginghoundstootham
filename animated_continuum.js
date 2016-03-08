//setup canvas

const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');


//user settings

ctx.lineWidth = 1;
const SCALE = 100;
const DIMENSION = 8;
WIDTH = HEIGHT = canvas.width = canvas.height = SCALE * DIMENSION;
const STRIPE_COUNT = 2000;
const COLOR_A = "#000";
const COLOR_B = "#fff";
var THINNING_RATE = 1/2;
const FRAME_RATE = 1000/60;

function triangularNumber(n) {
  return n * (n + 1) / 2;
}

function inverseTriangularNumber(n) {
  return 0.5 * Math.sqrt(8 * n + 1) - 0.5;
}

// main loop

setInterval(function() {


  // animate

  THINNING_RATE = THINNING_RATE * 1.005;


  //populate stripes

  var stripes = [];
  for (var n = 0; n < STRIPE_COUNT; n++) {
    stripes.push(inverseTriangularNumber(n) / THINNING_RATE);
  }


  //draw squares

  for (var x = 0; x < DIMENSION; x++) {
    for (var y = 0; y < DIMENSION; y++) {
      if (x % 2 !== 0 && y % 2 === 0) {
        solidSquare(COLOR_A, x, y);
      } else if (x % 2 === 0 && y % 2 !== 0) {
        solidSquare(COLOR_B, x, y);
      } else if (x % 2 === 0 && y % 2 === 0) {
        stripedSquare(COLOR_A, x, y);
      } else {
        stripedSquare(COLOR_B, x, y);
      }
    }
  }

  function stripedSquare(color, x, y) {
    stripes.forEach(function(curModulus, index) {
      ctx.fillStyle = color;
      var nextModulus = stripes[index + 1] || 2;
      ctx.beginPath();
      ctx.moveTo((x + curModulus) * SCALE, y * SCALE);
      ctx.lineTo((x + nextModulus) * SCALE, y * SCALE);
      ctx.lineTo(x * SCALE, (y + nextModulus) * SCALE)
      ctx.lineTo(x * SCALE, (y + curModulus) * SCALE);
      ctx.closePath();
      ctx.fill();
      color = color === COLOR_A ? COLOR_B : COLOR_A;
    })
  }

  function solidSquare(color, x, y) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x * SCALE, y * SCALE, SCALE, SCALE);
    ctx.fill();
  }


}, FRAME_RATE);
