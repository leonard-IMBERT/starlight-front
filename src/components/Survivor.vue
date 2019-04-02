<template>
  <li class="list-group-item" data-toggle="collapse" :data-target="'#data-' + survivor.id">
    {{ survivor.Name }}
    <button type="button" class="btn goto" @click="goto" ref="goto">>></button>
    <div class="collapse subsection" :id="'data-' +  survivor.id">
      <ul>
        <li>Description: {{ survivor.Description }}</li>
        <li>Position: {{ survivor.Position.x }},{{ survivor.Position.y }}</li>
        <li>Health: {{ survivor.Health }}</li>
        <li>Items: {{ survivor.Items }}</li>
        <li v-if="survivor.Conditions != null"> Conditions: {{ survivor.Conditions }}</li>
        <li v-if="survivor.Jobs != null">Jobs: {{ survivor.Jobs }}</li>
      </ul>
    </div>
  </li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Survivor from '../Survivor';

@Component
export default class SurvivorComponent extends Vue {
  @Prop() private survivor!: Survivor;

  goto(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const bud = document.querySelector('#beacon');
    if (this.survivor != null && bud instanceof HTMLElement) {
      const ev = new CustomEvent('goto', { detail: this.survivor.Position, bubbles: true });
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
