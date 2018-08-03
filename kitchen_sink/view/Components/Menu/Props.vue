<template>
  <props-list :props="props" />
</template>

<script lang="ts">
import PropsList, { PropDefinitions } from '@kitchen/component/Props';
import Vue from 'vue';

const props: PropDefinitions = {
  items: { type: 'Iterable', description: 'Menu items', required: true },
  active: { type: 'String, Number', description: 'Key or index of active item' },
};

export default Vue.extend({
  components: { PropsList },
  data: () => ({ props }),
});
</script>
