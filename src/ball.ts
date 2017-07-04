import { drawCircle } from "./draw";
import { Paddle } from "./paddle";

export class Ball {
  private canvasWidth: number;
  private canvasHeight: number;
  private _x: number;
  private _y: number;
  private ballR: number;
  private color: string;
  private dx: number = 2;
  private dy: number = -2;
  private paddle: Paddle;

  constructor(canvasWidth: number,
              canvasHeight: number,
              startX: number,
              startY: number,
              r: number,
              startColor: string,
              paddle: Paddle) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this._x = startX;
    this._y = startY;
    this.ballR = r;
    this.color = startColor;
    this.paddle = paddle;
  }

  public advance() {
    this._x += this.dx;
    this._y += this.dy;
  }

  public draw(context: CanvasRenderingContext2D) {
    drawCircle(context, this._x, this._y, this.ballR, this.color);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  public reverseX(): void {
    this.dx = -this.dx;
    this.color = Ball.randomColor();
  }

  public reverseY(): void {
    this.dy = -this.dy;
    this.color = Ball.randomColor();
  }

  private static randomColor(): string {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
}
