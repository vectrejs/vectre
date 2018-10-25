<template>
  <div class="main-menu">
    <accordion 
      :items="routes" 
      :checked="checked" 
      @check="checked = $event" 
      multiple
    >
      <!-- Menu item -->
      <div slot="header" slot-scope="{item: route, index}">
        <router-link 
          v-if="!route.children && !route.anchors" 
          :to="route.path" 
          @click.native="onSelect"
          tag="div" 
          class="router-link" 
        > 
          {{route.title}} 
        </router-link>

        <template v-else>{{ route.title }}</template>
      </div>

      <template slot-scope="{item: parent, index}" slot="body">
        <!-- Submenu items with anchors -->
        <vs-menu
          v-if="parent.anchors"
          :items="parent.anchors"
          class="menu-nav" 
        >
          <router-link 
            slot-scope="{item: anchor, index: title}"
            :key="title"
            :to="parent.path + '#' + anchor"
            @click.native="onSelect(), goToAnchor(parent.path, anchor)"
          >
            {{ title }}
          </router-link>
        </vs-menu>

        <!-- Submenu items from children -->
        <vs-menu 
          v-if="parent.children" 
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
      </template>
    
    </accordion>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue';
import { Route, RawLocation } from 'vue-router';
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

    for (const i in this.routes) {
      if (this.routes[i].children) {
        const isCurrent = this.routes[i].children
          .some((child: RouteConfig) =>
            matched.includes(child.component!),
        );

        if (isCurrent) {
          this.checked = [+i];
          return;
        }
      } else if (matched.includes(this.routes[i].component)) {
        this.checked = [+i];
        return;
      }
    }
  },

  methods: {
    onSelect(): void {
      this.$emit('select');
    },
    goToAnchor(path: RawLocation, anchor: string) {
      this.$router.push(path + '#' + anchor);
    },
  },
});
</script>

<style lang="scss">
.main-menu {
  .router-link-active {
    font-weight: bold;
  }
}
</style>

