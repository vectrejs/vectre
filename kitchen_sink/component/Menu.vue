<template>
  <div class="main-menu">
    <accordion 
      :items="routes" 
      :checked="checked" 
      @check="checked = $event" 
      multiple
    >
      <div slot="header" slot-scope="{item: route, index}">
        <router-link tag="div" class="router-link" v-if="!route.children" :to="route.path" @click.native="onSelect"> 
          {{route.title}} 
        </router-link>
        <template v-else>{{ route.title }}</template>
      </div>

      <vs-menu 
        v-if="parent.children" 
        slot-scope="{item: parent, index}" 
        slot="body" 
        :items="parent.children"
        class="menu-nav" 
      >

        <router-link 
          slot-scope="{item: child, index}" 
          :to="parent.path + '/' + child.path" 
          @click.native="onSelect"
        >
          {{ child.title }}
        </router-link>

      </vs-menu>
    
    </accordion>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { Route } from 'vue-router';
import { Component, RouteConfig } from 'vue-router/types/router';

export default Vue.extend({
  props: {
    routes: [Object, Array],
  },

  data: () => ({
    checked: [] as number[],
  }),

  created() {
    const matched = this.$router.getMatchedComponents();

    // tslint:disable-next-line:forin
    for (const i in this.routes) {
      const isCurrent = (this.routes[i].children || [])
        .some((child: RouteConfig) =>
          matched.includes(child.component!),
        );

      if (isCurrent) {
        this.checked.push(+i);
      }
    }
  },

  methods: {
    onSelect(): void {
      this.$emit('select');
    },
  },
});
</script>

<style lang="scss">
.main-menu {
  // . accordion-header {}
  .router-link-active {
    font-weight: bold;
  }
}
</style>

