<template>
  <props-list :props="props" />
</template>

<script lang="ts">
import Vue from 'vue';
import PropsList, { PropDefinitions } from '@kitchen/component/Props';

const props: PropDefinitions = {
  crumbs: {
    type: '{ path: string, title: string }, Object[]',
    description: 'Elements shown as breadcrumbs',
    required: true,
  },
};

export default Vue.extend({
  components: { PropsList },
  data: () => ({ props }),
});
</script>
