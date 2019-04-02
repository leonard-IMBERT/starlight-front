import Point = require("./Point");

export  = Zoomer

declare class Zoomer {
  offsetX: number;
  offsetY: number;
  scale: number;
  sizex: number;
  sizey: number;

  constructor(sizex: number, sizey: number);

  limitx(): number;
  limity(): number;

  newPoint(x: number, y: number): Point;

  zoom(deltaZoom: number): void;
  isOut(): void;
  moveZoom(dx: number, dy: number): void;
  drawZoomed(f: (x: number, y: number, scale: number) => void, x: number, y: number): void;
  
  zoomOffset(): { x: number, y: number };

}