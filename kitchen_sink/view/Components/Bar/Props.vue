<template>
  <props-list :props="props" />
</template>

<script lang="ts">
import Vue from 'vue';
import PropsList, { PropDefinitions } from '@kitchen/component/Props';

const props: PropDefinitions = {
  value: {
    type: 'Number',
    description: 'The current value',
    default: 0,
  },
  min: {
    type: 'Number',
    description: 'The minimum allowed value',
    default: 0,
  },
  max: {
    type: 'Number',
    description: 'The maximum allowed value',
    default: 100,
  },
  tooltip: {
    type: 'Function<String>, String',
    description: 'Suffix string or helper function to show current value inside of tooltip',
  },
  sm: {
    type: 'Boolean',
    description: 'The flag to make a bar thinner',
  },
};

export default Vue.extend({
  components: { PropsList },
  data: () => ({ props }),
});
</script>
