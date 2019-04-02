<template>
  <div>
    <div class="form-group mb-0">
      <input
        type="text"
        class="search form-control"
        placeholder="Search for a name here"
        v-model="search"
      >
    </div>
    <ul class="list-group">
      <SurvivorComponent
        v-for="survivor in displayedSurvivors"
        v-bind:survivor="survivor"
        :key="survivor.id"
      ></SurvivorComponent>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import uuid from 'uuid';
import Survivor from '../Survivor';
import SurvivorComponent from './Survivor.vue';
import Requests from '../Requests';

@Component({
  components: {
    SurvivorComponent,
  },
})
export default class SideBar extends Vue {
  @Prop() private msg!: string;

  private survivors: Survivor[] = [];

  private displayedSurvivors: Survivor[] = [];

  private search: string = '';

  mounted() {
    fetch(Requests.AllInfoRequest(Requests.BASE_URL)).then(d => d.json())
      .then((survs) => {
        if (!(survs instanceof Array)) throw new Error('Data is corrupted');

        this.survivors = survs.map((inhab) => {
          const numItems = inhab.items.toString() === '' ? 0 : inhab.items.length;

          const survivor: Survivor = {
            Name: inhab.Name,
            Description: inhab.Description,
            Position: inhab.Position,
            Health: `${inhab.Health}/${inhab.MaxHealth}`,
            Items: `(${numItems}) ${inhab.items.toString().replace(/,/g, ', ')}`,
            Conditions: null,
            Jobs: null,
            id: uuid.v4(),
          };

          // Pretifiying the conditions and jobs
          if (!inhab.conditions.includes('')) {
            survivor.Conditions = inhab.conditions.toString().replace(/,/g, ', ');
          }
          if (!inhab.jobs.includes('')) {
            survivor.Jobs = inhab.jobs.toString().replace(/,/g, ', ');
          }

          return survivor;
        });
        this.displayedSurvivors = this.survivors;
      }).catch(err => console.error(err));
    // Listen for goto
  }

  @Watch('search')
  onSearchChange(val: string, oldVal: string) {
    this.displayedSurvivors = this.survivors.filter((h) => {
      const name = h.Name.toLowerCase();
      const search = val.toLowerCase();
      return name.match(new RegExp(search)) != null;
    });
  }
}
</script>

<style lang="scss" scoped>
ul {
  height: calc(100% - 2rem);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
