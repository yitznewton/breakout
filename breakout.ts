class Ball {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private r: number;
  private startColor: string;
  private dx: number = 2;
  private dy: number = -2;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, startX: number, startY: number, r: number, startColor: string) {
    this.canvas = canvas;
    this.context = context;
    this.x = startX;
    this.y = startY;
    this.r = r;
    this.startColor = startColor;
  }

  draw() {
    drawCircle(this.context, this.x, this.y, this.r, this.startColor);
    this.anticipateWallCollisions();
    this.setNextCenter();
  }

  private anticipateWallCollisions() {
    if (this.y + this.dy < 0) {
      this.dy = -this.dy;
      this.startColor = Ball.randomColor();
    }
    if (this.y + this.dy > this.canvas.height) {
      this.dy = -this.dy;
      this.startColor = Ball.randomColor();
    }
    if (this.x + this.dx < 0) {
      this.dx = -this.dx;
      this.startColor = Ball.randomColor();
    }
    if (this.x + this.dx > this.canvas.width) {
      this.dx = -this.dx;
      this.startColor = Ball.randomColor();
    }
  }

  private setNextCenter() {
    this.x += this.dx;
    this.y += this.dy;
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
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private color: string = '#0095DD';
  private height: number;
  private width: number;
  private direction: PaddleDirection = PaddleDirection.Stationary;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, height: number, width: number) {
    this.canvas = canvas;
    this.context = context;
    this.height = height;
    this.width = width;
    this.x = (canvas.width - this.width) / 2;
    this.y = canvas.height - this.height;
  }

  draw(direction: PaddleDirection) {
    this.direction = direction;
    this.setNextPoint();
    this.anticipateWallCollision();
    drawRectangle(this.context, this.x, this.y, this.width, this.height, this.color);
  }

  private setNextPoint() {
    this.x += this.direction;
  }

  private anticipateWallCollision() {
    if (this.x <= 0) {
      this.x = 0;
    }

    if (this.x + this.width > this.canvas.width) {
      this.x = this.canvas.width - this.width;
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
const ball = new Ball(canvas, context, ballStartX, ballStartY, r, ballStartColor);
const paddleInput = new PaddleInput();
const paddle = new Paddle(canvas, context, paddleHeight, paddleWidth);

const draw = () => {
  clear(context, canvas);
  ball.draw();
  paddle.draw(paddleInput.current());

  requestAnimationFrame(draw);
};

paddleInput.listen();
requestAnimationFrame(draw);
