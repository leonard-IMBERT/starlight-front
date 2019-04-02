<template>
  <div>
    <canvas ref="drawing"></canvas>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import StarMap from '@/StarMap';
import Images from '@/drawer/Images';

@Component
export default class Map extends Vue {
  @Prop() private msg!: string;

  private starmap!: StarMap;

  private map!: Images;

  mounted() {
    if (this.$refs.drawing instanceof HTMLCanvasElement) {
      this.starmap = new StarMap(this.$refs.drawing);
      this.map = new Images();
      this.map.load('http://localhost:3000/map', StarMap.MAP_WIDTH, StarMap.MAP_HEIGHT, 0, 0)
        .then(_ => this.starmap.setImage(this.map));
    } else {
      console.error('There is no canvas on this page');
    }
    const bud = document.querySelector('#beacon');
    if (bud instanceof HTMLElement) {
      bud.addEventListener('goto', (e) => {
        if (e instanceof CustomEvent) {
          const hexa = this.starmap.findHexagon(e.detail.x, e.detail.y);
          if (hexa != null) {
            hexa.setSelection(true);
            this.starmap.drawMap();
          }
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
div {
  background-image: linear-gradient(#101030, #002);
  padding-right: calc((100% - 924px) / 4 + 15px);
  padding-left: calc((100% - 924px) / 4 + 15px);
  margin-left: -15px;
  margin-right: -15px;
}
</style>
