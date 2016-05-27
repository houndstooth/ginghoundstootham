const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

ctx.lineWidth = 1;
const SCALE = 50;
const DIMENSION = 16;
WIDTH = HEIGHT = canvas.width = canvas.height = SCALE * DIMENSION;

const COLOR_A = "#000";
const COLOR_B = "#00f";
const COLOR_C = "#fff";
const COLOR_D = "#0f0";
const COLOR_E = "#f00";

for (var x = 0; x < DIMENSION; x++) {
  for (var y = 0; y < DIMENSION; y++) {
    if (x % 5 === 0) stripesForSquareWithTopLeftTriangle(COLOR_A, x, y);
    if (x % 5 === 1) stripesForSquareWithTopLeftTriangle(COLOR_B, x, y);
    if (x % 5 === 2) stripesForSquareWithTopLeftTriangle(COLOR_C, x, y);
    if (x % 5 === 3) stripesForSquareWithTopLeftTriangle(COLOR_D, x, y);
    if (x % 5 === 4) stripesForSquareWithTopLeftTriangle(COLOR_E, x, y);

    if (y % 5 === 0) stripesForSquareWithBottomRightTriangle(COLOR_A, x, y);
    if (y % 5 === 2) stripesForSquareWithBottomRightTriangle(COLOR_B, x, y);
    if (y % 5 === 4) stripesForSquareWithBottomRightTriangle(COLOR_C, x, y);
    if (y % 5 === 1) stripesForSquareWithBottomRightTriangle(COLOR_D, x, y);
    if (y % 5 === 3) stripesForSquareWithBottomRightTriangle(COLOR_E, x, y);
  }
}

function stripesForSquareWithTopLeftTriangle(color, x, y) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x * SCALE, y * SCALE);
  ctx.lineTo((x + .5) * SCALE, y * SCALE);
  ctx.lineTo(x * SCALE, (y + .5) * SCALE);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo((x + 1) * SCALE, y * SCALE);
  ctx.lineTo((x + 1) * SCALE, (y + .5) * SCALE);
  ctx.lineTo((x + .5) * SCALE, (y + 1) * SCALE);
  ctx.lineTo(x * SCALE, (y + 1) * SCALE);
  ctx.closePath();
  ctx.fill();
}

function stripesForSquareWithBottomRightTriangle(color, x, y) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo((x + .5) * SCALE, y * SCALE);
  ctx.lineTo((x + 1) * SCALE, y * SCALE);
  ctx.lineTo(x * SCALE, (y + 1) * SCALE);
  ctx.lineTo(x * SCALE, (y + .5) * SCALE);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo((x + 1) * SCALE, (y + .5) * SCALE);
  ctx.lineTo((x + 1) * SCALE, (y + 1) * SCALE);
  ctx.lineTo((x + .5) * SCALE, (y + 1) * SCALE);
  ctx.closePath();
  ctx.fill();
}
