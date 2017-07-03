import { Ball } from './ball';
import { PaddleInput } from './paddle-input';
import { Paddle } from './paddle';

function clear(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

const canvas: HTMLCanvasElement = document.getElementById('gameCanvas') as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext('2d');

const ballStartX = canvas.width / 2;
const ballStartY = canvas.height - 30;
const ballStartColor = '#0095DD';

const paddleHeight = 10;
const paddleWidth = 75;

const r = 10;
const paddleInput = new PaddleInput();

const paddleFactory = function () {
  return new Paddle(canvas.width, canvas.height, paddleHeight, paddleWidth);
};

const ballFactory = function (paddle) {
  return new Ball(canvas.width, canvas.height, ballStartX, ballStartY, r, ballStartColor, paddle);
};

let paddle = paddleFactory();
let ball = ballFactory(paddle);

const draw = () => {
  clear(context, canvas);

  paddle.advance(paddleInput.current());
  ball.advance();

  ball.draw(context);
  paddle.draw(context);

  if (ball.isGameOver()) {
    alert('GAME OVER');

    paddle = paddleFactory();
    ball = ballFactory(paddle);
  }

  requestAnimationFrame(draw);
};

paddleInput.listen();
requestAnimationFrame(draw);
