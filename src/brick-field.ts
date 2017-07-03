import { each } from 'lodash';
import { drawRectangle } from './draw';

const rowCount = 3;
const columnCount = 5;
const padding = 10;
const offsetTop = 30;
const offsetLeft = 30;
const color = '#0095DD';

interface Brick {
  x: number,
  y: number,
  active: boolean
}

export class BrickField {
  private brickWidth: number;
  private brickHeight: number;
  private bricks: Brick[] = [];

  constructor(brickWidth: number, brickHeight: number) {
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;

    for (let i = 0; i < columnCount; i++) {
      for (let j = 0; j < rowCount; j++) {
        this.bricks.push({
          x: (i * (this.brickWidth + padding)) + offsetLeft,
          y: (j * (this.brickHeight + padding)) + offsetTop,
          active: true
        });
      }
    }
  }

  draw(context: CanvasRenderingContext2D) {
    each(this.bricks, brick => {
      if (!brick.active) return;

      drawRectangle(context, brick.x, brick.y, this.brickWidth, this.brickHeight, color);
    });
  }

  each(callback: (brick) => any): void {
    each(this.bricks, callback);
  }
}
