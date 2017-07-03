import { drawRectangle } from './draw';
import { PaddleDirection } from './paddle-direction';

export class Paddle {
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

  advance(direction: PaddleDirection) {
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
    this._x = Paddle.clamp(0, this._x, this.canvasWidth - this._width);
  }

  private static clamp(min, x, max) {
    return Math.min(Math.max(x, min), max);
  }
}
