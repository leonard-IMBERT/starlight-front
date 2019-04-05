<template>
  <li class="list-group-item" data-toggle="collapse" :data-target="'#data-' + magic.id">
    {{ magic.Name }} - {{ magic.Constelation }}
    <button type="button" class="btn goto" @click="goto" ref="goto">>></button>
    <div class="collapse subsection" :id="'data-' +  magic.id">
      <ul>
        <li>StarChart: {{ magic.StarChart.x }},{{ magic.StarChart.y }}</li>
        <li>Spell: {{ magic.Spell }}</li>
        <li v-for="level in magic.Levels" :key="level.Level">
          Level {{ level.Level }}: {{ level.Description }}
        </li>
        <li v-if="magic.OmCombo != null">Om Combo: {{ magic.OmCombo }}</li>
      </ul>
    </div>
  </li>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import Magic from '@/Magic';

@Component({})
export default class MagicComponent extends Vue {
  @Prop() private magic!: Magic;

  goto(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const bud = document.querySelector('#beacon');
    if (this.magic != null && bud instanceof HTMLElement) {
      const ev = new CustomEvent('goto', { detail: this.magic.StarChart, bubbles: true });
      bud.dispatchEvent(ev);
    }
  }
}
</script>
<style lang="scss" scoped>
$lightgray: #d6d6d6d6;

.subsection{
  background-color: $lightgray;
  border-top: 1px solid $lightgray;
  border-radius: 2px;
  margin: 10px -17.15px -10.5px -17.15px;
  padding: 10.5px 17.15px 10.5px 17.15px
}
.goto {
  float: right;
  padding: 0;
}
</style>
