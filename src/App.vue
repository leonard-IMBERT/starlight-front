<template>
  <div id="app">
    <Main></Main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from './components/Main.vue';

@Component({
  components: {
    Main,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body, html {
  height: 100%;
}
#app {
  max-height: 100%;
}
</style>
