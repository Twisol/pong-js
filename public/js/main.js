// Position as a percentage: 0 is all the way up, 1 is all the way down.
function render(ctx, leftPaddlePosition, rightPaddlePosition) {
  const paddleWidth  =  10.0;
  const paddleHeight = 100.0;

  const ballWidth  = 5.0;
  const ballHeight = 5.0;

  const canvas = ctx.canvas;

  // Background
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Left paddle
  ctx.fillStyle = "red";
  ctx.fillRect(
    10,
    leftPaddlePosition * (canvas.height - paddleHeight),
    paddleWidth,
    paddleHeight,
  );

  // Right paddle
  ctx.fillStyle = "red";
  ctx.fillRect(
    (canvas.width - 10) - paddleWidth,
    rightPaddlePosition * (canvas.height - paddleHeight),
    paddleWidth,
    paddleHeight);

  // Ball
  ctx.fillStyle = "red";
  ctx.fillRect(
    (canvas.width  / 2.0) - (ballWidth  / 2.0),
    (canvas.height / 2.0) - (ballHeight / 2.0),
    ballWidth,
    ballHeight);
}

// Position as a percentage: 0 is all the way up, 1 is all the way down.
let leftPaddlePosition  = 0.5;
let rightPaddlePosition = 0.5;
// The time at which this game state is given.
let stateTime = performance.now();

let inputs = {
  "leftPaddleUp":   false,
  "leftPaddleDown": false,
};

function clamp(min, max, x) {
  if (x < min) return min;
  if (max < x) return max;
  return x;
}

function update(eventTime) {
  let deltaTime = eventTime - stateTime;
  stateTime = eventTime;

  let wForce = (inputs.leftPaddleUp)   ? -0.001 : 0.0;
  let sForce = (inputs.leftPaddleDown) ? +0.001 : 0.0;
  let leftPaddleVelocity  = wForce + sForce;
  let rightPaddleVelocity = 0.0;

  leftPaddlePosition  = clamp(0.0, 1.0, leftPaddlePosition  + leftPaddleVelocity  * deltaTime);
  rightPaddlePosition = clamp(0.0, 1.0, rightPaddlePosition + rightPaddleVelocity * deltaTime);
}

const ctx = document.getElementById("game-canvas").getContext("2d");

window.requestAnimationFrame(function gameLoop() {
  window.requestAnimationFrame(gameLoop);

  update(performance.now());

  render(ctx, leftPaddlePosition, rightPaddlePosition);
});

ctx.canvas.addEventListener("keydown", (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  update(performance.now());

  switch (ev.code) {
    case "KeyW": inputs.leftPaddleUp   = true; break;
    case "KeyS": inputs.leftPaddleDown = true; break;
  }
});
ctx.canvas.addEventListener("keyup", (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  update(performance.now());

  switch (ev.code) {
    case "KeyW": inputs.leftPaddleUp   = false; break;
    case "KeyS": inputs.leftPaddleDown = false; break;
  }
});
