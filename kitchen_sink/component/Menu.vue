<template>
  <div class="main-menu">
    <accordion :items="routes">
      <span slot="header" slot-scope="{item, index}">{{item.value.title}}</span>
      <vs-menu class="menu-nav" slot="body" slot-scope="{item, index}" :items="item.value.children">
        <router-link slot-scope="{item, index}" :to="'./' + item.path"> {{ item.title }} </router-link>
      </vs-menu>
    </accordion>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    routes: [Object, Array],
  },
});
</script>
