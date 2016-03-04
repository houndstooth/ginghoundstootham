const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
WIDTH = HEIGHT = canvas.width = canvas.height = 800;
ctx.lineWidth = 1;

const SCALE = 100;
const DIMENSION = 8;

var stripeColor = "black";
for (var z = 0; z < 5; z++) {
  stripeColor = stripeColor === "black" ? "white" : "black";
  ctx.fillStyle = stripeColor === "white" ? "#fff" : "#000";
  console.log(ctx.fillStyle);
  ctx.beginPath();
  ctx.moveTo((z + 0) * SCALE, 0);
  ctx.lineTo((z + 1) * SCALE, 0);
  ctx.lineTo(0, (z + 1) * SCALE);
  ctx.lineTo(0, (z + 0) * SCALE);
  ctx.closePath();
  ctx.fill();
}

// for (var x = 0; x < DIMENSION; x++) {
//   for (var y = 0; y < DIMENSION; y++) {
//     if (x % 2 !== 0 && y % 2 === 0) solidSquare("black");
//     if (x % 2 === 0 && y % 2 !== 0) solidSquare("white");
//   }
// }
//
// function solidSquare(color) {
//   ctx.fillStyle = color === "white" ? "#fff" : "#000";
//   ctx.beginPath();
//   ctx.moveTo((x + 0) * SCALE, (y + 0) * SCALE);
//   ctx.lineTo((x + 0) * SCALE, (y + 1) * SCALE);
//   ctx.lineTo((x + 1) * SCALE, (y + 1) * SCALE);
//   ctx.lineTo((x + 1) * SCALE, (y + 0) * SCALE);
//   ctx.closePath();
//   ctx.fill();
// }
