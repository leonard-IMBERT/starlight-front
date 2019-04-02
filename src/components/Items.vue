<template>
  <div id="list">
    <div class="row">
      <div class="col-6">
        <h1>Items</h1>
      </div>
      <div class="col-6 pt-2">
        <div class="btn-group right">
          <button class="btn btn-secondary" @click="sortBy('name')">Sort by name</button>
          <button class="btn btn-secondary" @click="sortBy('qty')">Sort by quantity</button>
        </div>
      </div>
    </div>
    <ul class="list list-group">
      <li v-for="item in items" :key="item[0]" class="list-group-item py-1">
        <span class="name">{{ item[0] }}</span>: <span class="qty">{{ item[1] }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Requests from '@/Requests';
import List from 'list.js';

@Component
export default class Items extends Vue {
  private items: [string, number][] = [];

  private list?: List;

  mounted() {
    fetch(Requests.StatsRequest('http://localhost:3000')).then(_ => _.json())
      .then((data: any) => {
        Object.entries<string>(data).forEach((val: [string, string]) => {
          if (val[0] !== '') {
            this.items.push([val[0], Number(val[1])]);
          }
        });
        this.list = new List('list', { valueNames: ['name', 'qty'] });
      });
  }

  sortBy(key: string) {
    if (this.list) {
      this.list.reIndex();
      this.list.sort(key, {});
    }
  }
}
</script>
<style lang="scss" scoped>
.right {
  float: right;
}
</style>
