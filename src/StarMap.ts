import Drawer from '@/drawer/Drawer';
import Zoomer from '@/drawer/Zoomer';
import Images from '@/drawer/Images';
import Metadata from '@/Metadata';
import Hexagon from '@/hexagon/hexagon';
import Requests from './Requests';


function fetchMetadata(): Promise<Metadata> {
  return fetch(Requests.MetadataRequest(Requests.BASE_URL)).then(d => d.json());
}

class StarMap {
  private drawer: Drawer

  private zoomer: Zoomer

  private canvas: HTMLCanvasElement

  private map: Images = new Images();

  private metadata: Metadata | null = null;

  private clicked: boolean = false;

  private hexagons: Hexagon[] = [];

  private touchs: Touch[] = [];

  public static readonly MAP_WIDTH = 962;

  public static readonly MAP_HEIGHT = 924;

  constructor(canvas: HTMLCanvasElement) {
    this.drawer = new Drawer(canvas);
    this.zoomer = new Zoomer(StarMap.MAP_WIDTH, StarMap.MAP_HEIGHT);
    this.canvas = canvas;
    this.init();
  }

  private updateTouchs(touchList: TouchList): {x: number, y: number}[] {
    const ret: {x: number, y:number}[] = [];
    /* Update with new touches and fill the deplacement vector */
    Array.from(touchList).forEach((touch) => {
      const index = this.touchs.findIndex(t => t.identifier === touch.identifier);
      if (index >= 0) {
        ret[touch.identifier] = {
          x: this.touchs[index].screenX - touch.screenX,
          y: this.touchs[index].screenY - touch.screenY,
        };
        this.touchs[index] = touch;
      } else {
        this.touchs.push(touch);
      }
    });

    /* Clean for old touchs */
    this.touchs
      .filter(touch => Array
        .from(touchList)
        .find(t => t.identifier === touch.identifier) != null);

    return ret;
  }

  private stillLoading(): boolean {
    if (this.map == null || this.map.loadFinished === false) {
      console.warn('The map is still loading, please wait');
      return true;
    }
    return false;
  }

  private init(): Promise<void> {
    const proms: Promise<void>[] = [];
    proms.push(fetchMetadata().then((metadata) => {
      this.metadata = metadata;
    }).then(() => {
      if (this.metadata != null) {
        for (let row = 1; row <= 71; row += 1) {
          for (let col = 0; col < this.metadata['row-length'][`${row}`]; col += 1) {
            this.hexagons.push(new Hexagon(
              this.metadata['left-offset'][`${row}`] + col * this.metadata['horizontal-step'],
              this.metadata['bottom-offset'] + row * this.metadata['vertical-step'] - Math.round(this.metadata.flatten * row),
              10,
              10,
              row,
              col + 1,
            ));
          }
        }
      }
    }));

    return Promise.all(proms).then(() => {
      // Eventing

      this.canvas.addEventListener('mousemove', e => this.onMove(e));
      this.canvas.addEventListener('wheel', e => this.onZoom(e));
      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) { return; }
        e.preventDefault();
        this.updateTouchs(e.touches);
        this.clicked = true;
      });
      this.canvas.addEventListener('touchmove', e => this.onMove(e));
      this.canvas.addEventListener('touchend', (e) => {
        this.onClick(e);
        this.clicked = false;
      });
      this.canvas.addEventListener('click', e => this.onClick(e));
      this.canvas.addEventListener('touchcancel', () => { this.clicked = false; });
      this.canvas.addEventListener('mousedown', () => { this.clicked = true; });
      this.canvas.addEventListener('mouseup', () => { this.clicked = false; });
      this.canvas.addEventListener('mouseout', () => { this.clicked = false; });
    }).then(() => {
      this.drawer.setSize(this.map.width, this.map.height);
      this.setScale();
      this.drawMap();
    });
  }

  public setScale(): void {
    // Check for default scale
    if (this.canvas.offsetParent instanceof HTMLElement) {
      const scale = (document.body.clientWidth - this.canvas.offsetParent.offsetLeft)
        / this.canvas.width;
      if (scale < 1) {
        if (scale <= 0) return;
        this.zoomer.scale = scale;
        this.zoomer.overflow = true;
        this.zoomer.isOut();
      }
    }
  }

  public setImage(map: Images): StarMap {
    this.map = map;
    this.drawMap();
    return this;
  }

  public setMetadata(meta: Metadata): StarMap {
    this.metadata = meta;
    return this;
  }

  public drawMap(): StarMap {
    if (this.stillLoading()) return this;

    this.drawer.setSize(this.map.width, this.map.height);
    this.drawer.clean();
    this.zoomer.drawZoomed((x: number, y: number, scale: number) => {
      this.drawer.drawImageScale(x, y, scale, this.map);
    }, 0, 0);
    this.hexagons.forEach((h) => {
      if (h.active || h.select) h.draw(this.drawer, this.zoomer);
    });
    return this;
  }

  private factorWidth(): number {
    return this.map.width / this.canvas.clientWidth / this.zoomer.scale;
  }

  private factorHeight(): number {
    return this.map.height / this.canvas.clientHeight / this.zoomer.scale;
  }

  private translateCoordinate(x: number, y: number): { x: number, y: number } {
    const posx = this.factorWidth() * x + this.zoomer.zoomOffset().x;
    const posy = this.factorHeight() * y + this.zoomer.zoomOffset().y;
    return {
      x: posx,
      y: posy,
    };
  }

  public onMove(e: MouseEvent | TouchEvent): void {
    if (this.stillLoading()) return;


    let pos: { x: number, y: number } = { x: 0, y: 0 };
    let mov: { x: number, y: number } = { x: 0, y: 0 };
    if (e instanceof MouseEvent) {
      pos = { x: e.offsetX, y: e.offsetY };
      mov = { x: -e.movementX, y: -e.movementY };
    } else if (e instanceof TouchEvent) {
      if (e.touches.length > 1) return;
      if (this.canvas.offsetParent instanceof HTMLElement) {
        pos = {
          x: e.changedTouches[0].pageX - this.canvas.offsetParent.offsetLeft,
          y: e.changedTouches[0].pageY - this.canvas.offsetParent.offsetTop,
        };
      }
      [mov] = this.updateTouchs(e.touches);
    }

    const { x, y } = this.translateCoordinate(pos.x, pos.y);

    this.hexagons.forEach((h) => {
      if (h.isIn(x, y)) h.setActivity(true);
      else h.setActivity(false);
    });

    if (this.clicked) {
      this.zoomer.moveZoom(mov.x, mov.y);
    }

    this.drawMap();
  }

  public onZoom(e: WheelEvent): void {
    if (this.stillLoading()) return;

    this.zoomer.zoom(-e.deltaY / 1000);
    e.preventDefault();

    this.drawMap();
  }

  public onClick(e: MouseEvent | TouchEvent): void {
    if (this.stillLoading()) return;

    let pos: { x: number, y: number };
    if (e instanceof MouseEvent) {
      pos = { x: e.offsetX, y: e.offsetY };
    } else if (e instanceof TouchEvent) {
      if (e.touches.length > 1) return;
      if (this.canvas.offsetParent instanceof HTMLElement) {
        pos = {
          x: e.changedTouches[0].pageX - this.canvas.offsetParent.offsetLeft,
          y: e.changedTouches[0].pageY - this.canvas.offsetParent.offsetTop,
        };
      }
    }

    this.hexagons.forEach((h) => {
      if (h.isIn(pos.x, pos.y)) h.setSelection(true);
      else h.setSelection(false);
    });

    const beacon = document.querySelector<HTMLElement>('#beacon');

    if (beacon instanceof HTMLElement) {
      const poses = this.hexagons.filter(h => h.active).map(h => h.coord);
      const ev = new CustomEvent('selected', { detail: poses, bubbles: true });
      beacon.dispatchEvent(ev);
    }


    this.drawMap();
  }

  public selectedHexagons(): Hexagon[] {
    return this.hexagons.filter(h => h.select);
  }

  public unselect(): void {
    this.hexagons.forEach(h => h.setSelection(false));
  }

  public findHexagon(coordx: number, coordy: number): Hexagon | undefined {
    return this.hexagons.find(h => h.coord.x === coordx && h.coord.y === coordy);
  }
}

export default StarMap;
