<template>
  <div class="section">
    <h3>Multiple</h3>
    <accordion :items="items" multiple />
    <prism language="html" :code="html" />
  </div>
</template>

<script lang="ts">
import { Navigation } from '@components/Icon';
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    html: `<accordion :items="items" multiple>`,
    items: {
      Elements: 'Text about elements',
      Layout: 'Layout 1',
      Components: 'Components 1',
    },
  }),
});
</script>
