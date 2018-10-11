<template>
  <component-view>
    <h3>Select</h3>
    <form-group>
      <form-select v-model="selected" placeholder="Choose your option" :options="['1', '2', '3']" />
    </form-group>
    <form-group>
      <form-select v-model="selected" :options="{one: 1, two: 2, three: 3}" multiple />
    </form-group>
    <form-group>
      <form-select multiple v-model="selected">
        <form-option disabled value="1" >One</form-option>
        <form-option value="2" label="Two" />
        <form-option>three</form-option>
      </form-select>
    </form-group>
    Selected value: {{ selected }}

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
    selected: ['1', 'three'],
    selectedRadio: 'Male',
  }),
});
</script>
