<template>
  <div class="container-fluid">
    <Navbar v-on:change-tab="changeTab"></Navbar>
    <div class="row">
      <div id="sidebar" class="col-sm-12 col-md-3 p-0 sidebar-sticky">
        <SideBar class="sidebar"></SideBar>
    </div>
      <div id="content" class="col-sm-12 col-md-9 ml-auto">
        <keep-alive>
          <component v-bind:is="content"></component>
          <!-- <Map></Map>  -->
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SideBar from '@/components/SideBar.vue';
import Map from '@/components/Map.vue';
import Navbar from '@/components/Navbar.vue';
import Items from '@/components/Items.vue';

@Component({
  components: {
    SideBar,
    Map,
    Navbar,
    Items,
  },
})
export default class Main extends Vue {
  private content: String = 'Map';

  changeTab(e: String): void {
    this.content = e;
  }
}
</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;
}
.sidebar-sticky {
  box-shadow: 2px 0px #d6d6d6;
  position: fixed;
  top: calc(1rem + 35px);
  bottom: 0;
  left: 0;
  height: calc(100%);
}
@media screen and (max-width: 575.98px) {
  .sidebar-sticky {
    position: relative;
    top:0;
    height: 175px;
    margin-bottom: -3.7rem;
  }
  #content {
    margin: 0 !important;
    width: 100%;
  }
}
</style>
