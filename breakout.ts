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

var x = canvas.width / 2;
var y = canvas.height - 30;
var color = '#0095DD';
const r = 10;
const dx = 2;
const dy = -2;

function randomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
const draw = () => {
  function anticipateWallCollisions() {
    if (y + dy < 0) {
      dy = -dy;
      color = randomColor();
    }
    if (y + dy > canvas.height) {
      dy = -dy;
      color = randomColor();
    }
    if (x + dx < 0) {
      dx = -dx;
      color = randomColor();
    }
    if (x + dx > canvas.width) {
      dx = -dx;
      color = randomColor();
    }
  }

  function setNextCenter() {
    x += dx;
    y += dy;
  }

  clear(context, canvas);
  drawCircle(context, x, y, r, color);
  anticipateWallCollisions();
  setNextCenter();

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
