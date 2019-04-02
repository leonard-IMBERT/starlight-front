<template>
    <nav class="navbar navbar-light bg-light navbar-expand-lg bd-navbar">
      <a class="navbar-brand" href="#">Starlight Map v2</a>
      <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul
          class="navbar-nav mr-auto"
          @click="$emit('change-tab', $event.target.dataset.component)">
          <li class="nav-item">
            <a href="#" class="nav-link" data-component="Map">Map</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" data-component="Items">Item list</a>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Navbar extends Vue {
}
</script>
<style lang="scss" scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  margin: 0 -15px 0 -15px;
}
</style>
