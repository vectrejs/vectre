<template>
  <component-view>
    <h3>Radio</h3>
    
    <form-group>
      <form-label>Gender</form-label>
      <form-radio-group :options="['Male', 'Female']" name="gender-1" v-model="selectedRadio" />
    </form-group>

    <form-group>
      <form-label>Gender</form-label>
      <form-radio-group name="gender-2" v-model="selectedRadio">
        <form-radio>Male</form-radio>
        <form-radio>Female</form-radio>
      </form-radio-group>
    </form-group>
    
    <form-group>
      <form-label for="gender">Gender</form-label>
      <form-radio v-for="(gender, i) in ['Male', 'Female']" :key="i" name="gender" :value="gender" v-model="selectedRadio">
        {{gender}}
      </form-radio>
    </form-group>

    Selected radio: {{ selectedRadio }}
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
    selectedRadio: 'Male',
  }),
});
</script>
