import { drawRectangle } from "./draw";

export class Paddle {
  public x: number;
  private y: number;
  private _canvasWidth: number;
  private _height: number;
  private _width: number;
  private color: string = "#0095DD";

  constructor(canvasWidth: number, canvasHeight: number, height: number, width: number) {
    this._canvasWidth = canvasWidth;
    this._height = height;
    this._width = width;
    this.x = (this.canvasWidth - this._width) / 2;
    this.y = canvasHeight - this._height;
  }

  public draw(context: CanvasRenderingContext2D) {
    drawRectangle(context, this.x, this.y, this._width, this._height, this.color);
  }

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  get canvasWidth() {
    return this._canvasWidth;
  }
}
