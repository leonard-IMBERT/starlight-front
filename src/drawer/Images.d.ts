export = Images

declare class Images {
  loadFinished: boolean;
  data: HTMLImageElement | null;
  width: number;
  height: number;
  x: number;
  y: number;

  constructor();

  load(src: string, width: number, height: number, x: number, y: number): Promise<void>;
}