import { drawCircle } from './draw';
import { Paddle } from './paddle';

export class Ball {
  private canvasWidth: number;
  private canvasHeight: number;
  private ballX: number;
  private ballY: number;
  private ballR: number;
  private ballStartColor: string;
  private dx: number = 2;
  private dy: number = -2;
  private paddle: Paddle;

  constructor(canvasWidth: number, canvasHeight: number, startX: number, startY: number, r: number, startColor: string, paddle: Paddle) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ballX = startX;
    this.ballY = startY;
    this.ballR = r;
    this.ballStartColor = startColor;
    this.paddle = paddle;
  }

  advance() {
    this.anticipateWallCollisions();
    this.anticipatePaddleCollision();
    this.setNextCenter();
  }

  draw(context: CanvasRenderingContext2D) {
    drawCircle(context, this.ballX, this.ballY, this.ballR, this.ballStartColor);
  }

  isGameOver() {
    return this.ballY + this.dy > this.canvasHeight;
  }

  private anticipatePaddleCollision() {
    if (this.ballY + this.dy <= this.canvasHeight - this.paddle.height) return;

    if (this.ballX > this.paddle.x && this.ballX < this.paddle.x + this.paddle.width) {
      this.dy = -this.dy;
    }
  }

  private anticipateWallCollisions() {
    if (this.ballY + this.dy < 0) {
      this.dy = -this.dy;
      this.ballStartColor = Ball.randomColor();
    }
    if (this.ballX + this.dx < 0) {
      this.dx = -this.dx;
      this.ballStartColor = Ball.randomColor();
    }
    if (this.ballX + this.dx > this.canvasWidth) {
      this.dx = -this.dx;
      this.ballStartColor = Ball.randomColor();
    }
  }

  private setNextCenter() {
    this.ballX += this.dx;
    this.ballY += this.dy;
  }

  private static randomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}

