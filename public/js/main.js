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

const ctx = document.getElementById("game-canvas").getContext("2d");

window.requestAnimationFrame(function gameLoop() {
  render(ctx, leftPaddlePosition, rightPaddlePosition);
  window.requestAnimationFrame(gameLoop);
});
