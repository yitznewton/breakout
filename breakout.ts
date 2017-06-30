function drawRectangle(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  context.beginPath();
  context.rect(x, y, w, h);
  context.fillStyle = color;
  context.fill();
  context.closePath();
}

function drawArc(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  startAngle: number,
  endAngle: number,
  counterClockwise: boolean,
  color: string
) {
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

drawRectangle(context, 20, 40, 50, 50, '#ff0000');
drawCircle(context, 240, 160, 20, 'green');
