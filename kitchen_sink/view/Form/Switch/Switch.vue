<template>
  <component-view>
    <h3>Switch</h3>
    <form-group>
      <form-checkbox type="switch" v-model="light">Light</form-checkbox>
      <form-checkbox type="switch" v-model="light">Light</form-checkbox>
      <form-checkbox type="switch" v-model="light">Light</form-checkbox>
    </form-group>

    Ligth: {{ light ? 'ON' : 'OFF' }}
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { events } from './events';
import { props } from './props';
import { slots } from './slots';

export default Vue.extend({
  data: () => ({
    events,
    props,
    slots,
    light: false,
  }),
});
</script>
