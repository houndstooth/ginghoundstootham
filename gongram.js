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

var color, color_1, color_2;

const GINGHAM_MODE = false;

for (var x = 0; x < DIMENSION; x++) {
  for (var y = 0; y < DIMENSION; y++) {
    if (GINGHAM_MODE) {
      if (x % 5 === 0) color_1 = COLOR_A;
      if (x % 5 === 1) color_1 = COLOR_B;
      if (x % 5 === 2) color_1 = COLOR_C;
      if (x % 5 === 3) color_1 = COLOR_D;
      if (x % 5 === 4) color_1 = COLOR_E;

      if (y % 5 === 0) color_2 = COLOR_A;
      if (y % 5 === 2) color_2 = COLOR_B;
      if (y % 5 === 4) color_2 = COLOR_C;
      if (y % 5 === 1) color_2 = COLOR_D;
      if (y % 5 === 3) color_2 = COLOR_E;

      color = mixColors(color_1, color_2);

      solidSquare(color, x, y);
    } else {
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
}

function mixColors(color_1, color_2) {
  var result = "#";
  for (i = 1; i < 4; i++) {
    if (color_1[i] === color_2[i]) {
      result += color_1[i];
    } else {
      result += "8";
    }

    //alternate "OR" method
    // if (color_1[i] === "f" || color_2[i] === "f") {
    //   result += "f"
    // } else {
    //   result += "0"
    // }
  }
  return result;
}

function solidSquare(color, x, y) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(x * SCALE, y * SCALE, SCALE, SCALE);
  ctx.fill();
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

function stripedSquare(color_1, color_2, x, y, numStripes) {
  ctx.fillStyle = color_1;

  var unit = 2 / numStripes;
  var pos;

  for (i = 0; i < numStripes; i++) {
    pos = i * unit;

    //if bigger or smaller than 1 ... around the bend of corner

    ctx.beginPath();
    ctx.moveTo((x + pos) * SCALE, y * SCALE);
    ctx.lineTo((x + pos + pos) * SCALE, y * SCALE);
    ctx.lineTo()

    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = ctx.fillStyle === color_1 ? color_2 : color_1;
  }

  // ctx.beginPath();
  // ctx.moveTo(x * SCALE, y * SCALE);
  // ctx.lineTo((x + .5) * SCALE, y * SCALE);
  // ctx.lineTo(x * SCALE, (y + .5) * SCALE);
  // ctx.closePath();
  // ctx.fill();
  //
  // ctx.beginPath();
  // ctx.moveTo((x + 1) * SCALE, y * SCALE);
  // ctx.lineTo((x + 1) * SCALE, (y + .5) * SCALE);
  // ctx.lineTo((x + .5) * SCALE, (y + 1) * SCALE);
  // ctx.lineTo(x * SCALE, (y + 1) * SCALE);
  // ctx.closePath();
  // ctx.fill();
}
