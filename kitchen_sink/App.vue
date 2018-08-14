<template>
  <off-canvas>
    <anchored-menu slot="sidebar" :routes="routes"/>
    <router-view slot="content" />
  </off-canvas>
</template>

<script lang="ts">
import vue from 'vue';
import { AnchoredMenu } from 'vue-anchored-menu';
import Prism from 'vue-prism-component';
import { Component } from 'vue-property-decorator';
import router, { routes } from './router';

import './assets/';

import VectrePlugin from '../src/main';
import ComponentView from '@kitchen/component/Component.vue';

vue.component('prism', Prism);
vue.component('component-view', ComponentView);
vue.use(VectrePlugin);

@Component({
  router,
  components: {
    AnchoredMenu,
  },
})
export default class extends vue {
  private routes = routes;
}
</script>
