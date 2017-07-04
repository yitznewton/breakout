import { Ball } from "./ball";
import { BrickField } from "./brick-field";
import { Paddle } from "./paddle";
import { PaddleInput } from "./paddle-input";

function clear(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

const canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext("2d");

const ballStartX = canvas.width / 2;
const ballStartY = canvas.height - 30;
const ballStartColor = "#0095DD";

const paddleHeight = 10;
const paddleWidth = 75;

const brickWidth = 75;
const brickHeight = 20;

const r = 10;

const paddleFactory = () => {
  return new Paddle(canvas.width, canvas.height, paddleHeight, paddleWidth);
};

const ballFactory = (paddle) => {
  return new Ball(canvas.width, canvas.height, ballStartX, ballStartY, r, ballStartColor, paddle);
};

const brickFieldFactory = () => {
  return new BrickField(brickWidth, brickHeight);
};

function paddleBounce() {
  if (ball.y <= canvas.height - paddle.height) return;

  if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
    ball.reverseY();
  }
}

function wallBounce() {
  if (ball.y < 0) {
    ball.reverseY();
  }
  if (ball.x < 0) {
    ball.reverseX();
  }
  if (ball.x > canvas.width) {
    ball.reverseX();
  }
}

function brickBallCollision(brick, _ball: Ball) {
  return brick.active
    && _ball.x > brick.x
    && _ball.x < brick.x + brickWidth
    && _ball.y > brick.y
    && _ball.y < brick.y + brickHeight;
}

function brickBounce() {
  brickField.each((brick) => {
    if (brickBallCollision(brick, ball)) {
      ball.reverseY();
      brick.active = false;
    }
  });
}

function isGameOver() {
  return ball.y > canvas.height;
}

function isWon() {
  return brickField.isEmpty();
}

const reset = () => {
  paddle = paddleFactory();
  ball = ballFactory(paddle);
  brickField = brickFieldFactory();
};

const paddleInput = new PaddleInput(canvas);
let paddle = paddleFactory();
let ball = ballFactory(paddle);
let brickField = brickFieldFactory();

const draw = () => {
  clear(context, canvas);

  paddleInput.update(paddle);
  ball.advance();

  paddleBounce();
  wallBounce();
  brickBounce();

  ball.draw(context);
  paddle.draw(context);
  brickField.draw(context);

  if (isGameOver()) {
    alert("GAME OVER");
    reset();
  }

  if (isWon()) {
    alert("YOU WINNNN!");
    reset();
  }

  requestAnimationFrame(draw);
};

paddleInput.listen();
requestAnimationFrame(draw);
