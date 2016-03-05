const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
WIDTH = HEIGHT = canvas.width = canvas.height = 800;
ctx.lineWidth = 1;

const SCALE = 25;
const DIMENSION = 32;

// console.log(stripeEdges);
//
// var stripeColor = "black";
// for (var z = 0; z < 500; z++) {
//
//   stripeColor = stripeColor === "black" ? "white" : "black";
//   ctx.fillStyle = stripeColor === "white" ? "#fff" : "#000";
//
//   var zz = 0.5 * Math.sqrt(8 * z + 1) - (1/2);
  // var difference = zz % SCALE;
  // var nearestBorder = zz - difference;
  //
  // ctx.beginPath();
  // ctx.moveTo((zz + 0) * SCALE * 2, 0);
  // ctx.lineTo((zz + 1) * SCALE * 2, 0);
  // ctx.lineTo(nearestBorder, difference + SCALE * 2);
  // ctx.lineTo(nearestBorder, difference);
  // ctx.closePath();
  // ctx.fill();

  // ctx.beginPath();
  // ctx.moveTo((zz + 0) * SCALE * 2, 0);
  // ctx.lineTo((zz + 1) * SCALE * 2, 0);
  // ctx.lineTo(0, (zz + 1) * SCALE * 2);
  // ctx.lineTo(0, (zz + 0) * SCALE * 2);
  // ctx.closePath();
  // ctx.fill();
// }

// //draw the striped squares
// for (var i = 0; i < DIMENSION; i++) {
//   let first
//
//
//
//
//   //find the index of the first element of stripeEdges which would be inside this square (have to figure that out...? no we should just separately do diagonals? or more flexib)
//   for (var x = i; x > 0; x--) {
//     var y = i - x;
//     drawStripedSquare(x, y, [stripes])
//   }
// }
//
//
//
//
//
// function stripedSquare(x, y) {
//   //find the index of the first element of stripeEdges which would be inside this square (have to figure that out...? no we should just separately do diagonals? or more flexib)
// }





//draw the striped squares
var stripeEdges = [];
for (var z = 0; z < 555; z++) {
  stripeEdges.push(Math.sqrt(8 * z + 1) - (1/2));
}

var i = 0;
var thisDiagonalsStripeEdgeModuli = [0];
var color = "#000";

stripeEdges.forEach(function(stripeEdge) {
  if (stripeEdge >= i + 2) {
    // thisDiagonalsStripeEdgeModuli.push(1);
    console.log('THIS DIAGONALS MODULI', thisDiagonalsStripeEdgeModuli);
    color = color === "#000" ? "#fff" : "#000";
    drawStripedSquareDiagonal(thisDiagonalsStripeEdgeModuli, i, color);
    thisDiagonalsStripeEdgeModuli = [0];
    i += 2;
  }
  thisDiagonalsStripeEdgeModuli.push(stripeEdge % 2);
});

function drawStripedSquareDiagonal(thisDiagonalsStripeEdgeModuli, diagonal, color) {

  for (var x = diagonal; x >= 0; x--) {
    var y = diagonal - x;
    // console.log('****************CUR SQ OF DIAGONAL', x, y)
    color = color === "#000" ? "#fff" : "#000";
    drawStripedSquare(x, y, thisDiagonalsStripeEdgeModuli, color)
  }
}

function drawStripedSquare(x, y, thisDiagonalsStripeEdgeModuli, color) {
  thisDiagonalsStripeEdgeModuli.forEach(function(curModulus, index) {
    color = color === "#000" ? "#fff" : "#000";
    ctx.fillStyle = color;

    var nextModulus = thisDiagonalsStripeEdgeModuli[index + 1] || 2;
    // console.log('***CUR AND NEXT EDGE OF THIS SQ', curModulus, nextModulus)

    ctx.beginPath();
    ctx.moveTo((x + curModulus) * SCALE, y * SCALE);
    // console.log((x + curModulus) * SCALE, y * SCALE)
    ctx.lineTo((x + nextModulus) * SCALE, y * SCALE);
    // console.log((x + nextModulus) * SCALE, y * SCALE)
    ctx.lineTo(x * SCALE, (y + nextModulus) * SCALE)
    // console.log(x * SCALE, (y + nextModulus) * SCALE)
    ctx.lineTo(x * SCALE, (y + curModulus) * SCALE);
    // console.log(x * SCALE, (y + curModulus) * SCALE)
    ctx.closePath();
    ctx.fill();
  })
}




// draw the solid squares
for (var x = 0; x < DIMENSION; x++) {
  for (var y = 0; y < DIMENSION; y++) {
    if (x % 2 !== 0 && y % 2 === 0) solidSquare("black");
    if (x % 2 === 0 && y % 2 !== 0) solidSquare("white");
  }
}
function solidSquare(color) {
  ctx.fillStyle = color === "white" ? "#fff" : "#000";
  ctx.beginPath();
  ctx.rect(x * SCALE, y * SCALE, SCALE, SCALE);
  ctx.fill();
}
