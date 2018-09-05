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

    <h3>Icon</h3>
    <form-group>
      <form-input @change="log" placeholder="First Name" :loading="loading" icon="people" icon-side="right"/>
    </form-group>
    <form-group>
      <form-input @blur="log" v-model="val" placeholder="Email" size="lg" :loading="loading" icon="mail" icon-side="left"/>
      {{ val }}
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
    val: '',
  }),
  created() {
    // setInterval(() => this.loading = !this.loading, 1000);
  },
});
</script>
