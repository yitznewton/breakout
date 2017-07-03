import { PaddleDirection } from './paddle-direction';

export class PaddleInput {
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

enum ArrowKeys {
  Left = 37,
  Right = 39
}
