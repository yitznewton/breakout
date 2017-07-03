import { each } from 'lodash';
import { drawRectangle } from './draw';

const rowCount = 3;
const columnCount = 5;
const width = 75;
const height = 20;
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
  private bricks: Brick[] = [];

  constructor() {
    for (let i = 0; i < columnCount; i++) {
      for (let j = 0; j < rowCount; j++) {
        this.bricks.push({
          x: (i * (width + padding)) + offsetLeft,
          y: (j * (height + padding)) + offsetTop,
          active: true
        });
      }
    }
  }

  draw(context: CanvasRenderingContext2D) {
    each(this.bricks, brick => {
      if (!brick.active) return;

      drawRectangle(context, brick.x, brick.y, width, height, color);
    });
  }
}
