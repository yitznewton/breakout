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

function clear(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// function drawRectangle(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
//   context.beginPath();
//   context.rect(x, y, w, h);
//   context.fillStyle = color;
//   context.fill();
//   context.closePath();
// }

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

var startX = canvas.width / 2;
var startY = canvas.height - 30;
var startColor = '#0095DD';
const r = 10;
const ball = new Ball(canvas, context, startX, startY, r, startColor);

const draw = () => {
  clear(context, canvas);
  ball.draw();

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
