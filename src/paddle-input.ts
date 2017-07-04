import { find, map } from "lodash";
import { Paddle } from "./paddle";

const PADDLE_WIDTH = 75;
export class PaddleInput {
  private leftPressed: boolean = false;
  private rightPressed: boolean = false;
  private touchPosition: number = null;
  private mousePosition: number = null;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public update(paddle: Paddle): void {
    paddle.x = find(this.fromAllInputs(paddle), (x) => x !== null);
  }

  public listen() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === ArrowKeys.Left) {
        this.leftPressed = true;
      } else if (e.keyCode === ArrowKeys.Right) {
        this.rightPressed = true;
      }
    }, false);

    document.addEventListener("keyup", (e) => {
      if (e.keyCode === ArrowKeys.Left) {
        this.leftPressed = false;
      } else if (e.keyCode === ArrowKeys.Right) {
        this.rightPressed = false;
      }
    }, false);

    document.addEventListener("touchmove", (e) => {
      this.touchPosition = find(map(e.changedTouches,(touch) => {
        const xRelativeToCanvas = touch.clientX - this.canvas.offsetLeft;

        if (xRelativeToCanvas > 0 && xRelativeToCanvas < this.canvas.width) {
          return xRelativeToCanvas - PADDLE_WIDTH / 2;
        } else {
          return null;
        }
      }), (x) => x !== null);
    });

    document.addEventListener("mousemove", (e) => {
      const xRelativeToCanvas = e.clientX - this.canvas.offsetLeft;

      if (xRelativeToCanvas > 0 && xRelativeToCanvas < this.canvas.width) {
        this.mousePosition = xRelativeToCanvas - PADDLE_WIDTH / 2;
      } else {
        this.mousePosition = null;
      }
    });
  }

  private fromAllInputs(paddle: Paddle) {
    return [
      this.touchPosition,
      this.mousePosition,
      this.fromKeyboard(paddle),
    ];
  }

  private fromKeyboard(paddle): number {
    return this.anticipateWallCollision(paddle, this.dxFromKey());
  }

  private dxFromKey(): number {
    if (this.leftPressed && this.rightPressed) return 0;
    if (this.leftPressed) return -7;
    if (this.rightPressed) return 7;
    return 0;
  }

  private anticipateWallCollision(paddle, dx) {
    return PaddleInput.clamp(0, paddle.x + dx, this.canvas.width - paddle.width);
  }

  private static clamp(min, x, max) {
    return Math.min(Math.max(x, min), max);
  }
}

enum ArrowKeys {
  Left = 37,
  Right = 39,
}
