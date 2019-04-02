import Drawer = require("@/drawer/Drawer");
import Zoomer = require("@/drawer/Zoomer");

export = Hexagon

declare class Hexagon {
  pos: { x: number, y: number };
  size: { x: number, y: number };
  coord: { x: number, y: number };
  color: string;
  active: boolean;
  select: boolean;

  constructor(
    posx: number,
    posy: number,
    sizeX: number,
    sizeY: number,
    coordx: number,
    coordy: number,
    color?: string,
  );

  isIn(x: number, y: number): boolean;
  draw(drawer: Drawer, zoomer: Zoomer, labelOffset?: number): void;
  setActivity(status: boolean): void
  setSelection(status: boolean): void
}