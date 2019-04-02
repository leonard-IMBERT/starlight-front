import Images from '@/drawer/Images';

export = Drawer;

declare class Drawer {
  constructor(canvas: HTMLCanvasElement);

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  
  setSize(x: number, y: number): void;
  drawRectangle(
    posX: number,
    posY: number,
    height: number,
    width: number,
    color: string,
  ): void;
  drawTextBoxed(
    posX: number,
    posY: number,
    text: string,
    textColor: string,
    boxColor: string,
    fontSize?: number,
    fontStyle?: string,
  ): void
  drawText(
    posX: number,
    posY: number,
    text: string,
    textColor: string,
  ): void;
  drawImageScale(
    posX: number,
    posY: number,
    scale: number,
    image: Images,
  ): void;
  drawHexagon(
    posX: number,
    posY: number,
    size: number,
    color: string,
  ): void;
  drawImage(
    posX: number,
    posY: number,
    width: number,
    height: number,
    image: Images,
  ): void;
  clean(): void;
  setFont(font: string): void;

}