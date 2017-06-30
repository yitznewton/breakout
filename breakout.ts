class PlayingField {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private ballX: number;
  private ballY: number;
  private ballR: number;
  private ballStartColor: string;
  private dx: number = 2;
  private dy: number = -2;
  private paddle: Paddle;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, startX: number, startY: number, r: number, startColor: string, paddle: Paddle) {
    this.canvas = canvas;
    this.context = context;
    this.ballX = startX;
    this.ballY = startY;
    this.ballR = r;
    this.ballStartColor = startColor;
    this.paddle = paddle;
  }

  advance() {
    this.anticipateWallCollisions();
    this.anticipatePaddleCollision();
    this.setNextCenter();
  }

  draw() {
    drawCircle(this.context, this.ballX, this.ballY, this.ballR, this.ballStartColor);
  }

  isGameOver() {
    return this.ballY + this.dy > this.canvas.height;
  }

  private anticipatePaddleCollision() {
    if (this.ballY + this.dy <= this.canvas.height - this.paddle.height) return;

    if (this.ballX > this.paddle.x && this.ballX < this.paddle.x + this.paddle.width) {
      this.dy = -this.dy;
    }
  }

  private anticipateWallCollisions() {
    if (this.ballY + this.dy < 0) {
      this.dy = -this.dy;
      this.ballStartColor = PlayingField.randomColor();
    }
    if (this.ballX + this.dx < 0) {
      this.dx = -this.dx;
      this.ballStartColor = PlayingField.randomColor();
    }
    if (this.ballX + this.dx > this.canvas.width) {
      this.dx = -this.dx;
      this.ballStartColor = PlayingField.randomColor();
    }
  }

  private setNextCenter() {
    this.ballX += this.dx;
    this.ballY += this.dy;
  }

  private static randomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}

enum PaddleDirection {
  Left = -7,
  Stationary = 0,
  Right = 7
}

enum ArrowKeys {
  Left = 37,
  Right = 39
}

class PaddleInput {
  private leftPressed: boolean = false;
  private rightPressed: boolean = false;

  current(): PaddleDirection {
    if (this.leftPressed && this.rightPressed) return PaddleDirection.Stationary;
    if (this.leftPressed) return PaddleDirection.Left;
    if (this.rightPressed) return PaddleDirection.Right;
    return PaddleDirection.Stationary;
  }

  listen() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == ArrowKeys.Left) {
        this.leftPressed = true;
      }
      else if (e.keyCode == ArrowKeys.Right) {
        this.rightPressed = true;
      }
    }, false);

    document.addEventListener('keyup', (e) => {
      if (e.keyCode == ArrowKeys.Left) {
        this.leftPressed = false;
      }
      else if (e.keyCode == ArrowKeys.Right) {
        this.rightPressed = false;
      }
    }, false);
  }
}

class Paddle {
  private canvasWidth: number;
  private _x: number;
  private y: number;
  private _height: number;
  private _width: number;
  private color: string = '#0095DD';

  constructor(canvasWidth: number, canvasHeight: number, height: number, width: number) {
    this.canvasWidth = canvasWidth;
    this._height = height;
    this._width = width;
    this._x = (this.canvasWidth - this._width) / 2;
    this.y = canvasHeight - this._height;
  }

  update(direction: PaddleDirection) {
    this._x += direction;
    this.anticipateWallCollision();
  }

  draw(context: CanvasRenderingContext2D) {
    drawRectangle(context, this._x, this.y, this._width, this._height, this.color);
  }

  get x() {
    return this._x;
  }

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  private anticipateWallCollision() {
    if (this._x <= 0) {
      this._x = 0;
    }

    if (this._x + this._width > this.canvasWidth) {
      this._x = this.canvasWidth - this._width;
    }
  }
}

function clear(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawRectangle(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  context.beginPath();
  context.rect(x, y, w, h);
  context.fillStyle = color;
  context.fill();
  context.closePath();
}

function drawArc(context: CanvasRenderingContext2D,
                 x: number,
                 y: number,
                 r: number,
                 startAngle: number,
                 endAngle: number,
                 counterClockwise: boolean,
                 color: string) {
  context.beginPath();
  context.arc(x, y, r, startAngle, endAngle, counterClockwise);
  context.fillStyle = color;
  context.fill();
  context.closePath();
}

function drawCircle(context: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  drawArc(context, x, y, r, 0, Math.PI * 2, false, color);
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
let paddle = new Paddle(canvas.width, canvas.height, paddleHeight, paddleWidth);
let playingField = new PlayingField(canvas, context, ballStartX, ballStartY, r, ballStartColor, paddle);

const draw = () => {
  clear(context, canvas);
  playingField.advance();

  if (playingField.isGameOver()) {
    alert('GAME OVER');
    playingField = new PlayingField(canvas, context, ballStartX, ballStartY, r, ballStartColor, paddle);
    paddle = new Paddle(canvas.width, canvas.height, paddleHeight, paddleWidth);
  }

  playingField.draw();
  paddle.update(paddleInput.current());
  paddle.draw(context);

  requestAnimationFrame(draw);
};

paddleInput.listen();
requestAnimationFrame(draw);
