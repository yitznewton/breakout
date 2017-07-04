import { Paddle } from './paddle';

export class PaddleInput {
  private leftPressed: boolean = false;
  private rightPressed: boolean = false;

  update(paddle: Paddle): void {
    paddle.x = this.positionFromKey(paddle);
  }

  listen() {
    document.addEventListener('keydown', e => {
      if (e.keyCode == ArrowKeys.Left) {
        this.leftPressed = true;
      }
      else if (e.keyCode == ArrowKeys.Right) {
        this.rightPressed = true;
      }
    }, false);

    document.addEventListener('keyup', e => {
      if (e.keyCode == ArrowKeys.Left) {
        this.leftPressed = false;
      }
      else if (e.keyCode == ArrowKeys.Right) {
        this.rightPressed = false;
      }
    }, false);
  }

  private positionFromKey(paddle): number {
    return PaddleInput.anticipateWallCollision(paddle, this.dxFromKey());
  }

  private dxFromKey(): number {
    if (this.leftPressed && this.rightPressed) return 0;
    if (this.leftPressed) return -7;
    if (this.rightPressed) return 7;
    return 0;
  }

  private static anticipateWallCollision(paddle, dx) {
    return PaddleInput.clamp(0, paddle.x + dx, paddle.canvasWidth - paddle.width);
  }

  private static clamp(min, x, max) {
    return Math.min(Math.max(x, min), max);
  }
}

enum ArrowKeys {
  Left = 37,
  Right = 39
}
