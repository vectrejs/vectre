<template>
  <component-view>
    <h2>Input</h2>
    <form-group>
      <form-label for="name-1">Name</form-label>
      <form-input id="name-1" placeholder="Your Name" />
    </form-group>
    <h3>Size</h3>
      <form-group>
        <form-input placeholder="Small" size="sm" />
      </form-group>
      
      <form-group>
        <form-input placeholder="Default" />
      </form-group>
      
      <form-group>
        <form-input placeholder="Large" size="lg" />
      </form-group>
    </columns>
    <h3>Icon</h3>
    <form-group>
      <form-input placeholder="Small" id="test" size="lg" :loading="loading" icon="mail" icon-side="left"/>
    </form-group>
    
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { setInterval } from 'timers';

export default Vue.extend({
  methods: {
    // tslint:disable-next-line:no-console
    log(...args: any[]) { console.log(...args); },
  },
  data: () => ({
    loading: false,
  }),
  beforeMount() {
    setInterval(() => this.loading = !this.loading, 1000);
  },
});
</script>
