<template>
  <off-canvas>
    <anchored-menu slot="sidebar" :routes="routes"/>
    <router-view slot="content" />
  </off-canvas>
</template>

<script lang="ts">
import vue from 'vue';
import { Component } from 'vue-property-decorator';
import { AnchoredMenu } from "vue-anchored-menu";
import router, { routes } from './router';
import Prism from 'vue-prism-component';

import VectrePlugin from '../src/main';

import './assets/';

vue.component('prism', Prism);
vue.use(VectrePlugin);

@Component({
  router: router,
  components: {
    AnchoredMenu,
  },
})
export default class extends vue {
  public data() {
    return {
      routes
    };
  }
}
</script>
