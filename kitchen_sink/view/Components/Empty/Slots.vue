<template>
  <slots-list :slots="slots" />
</template>

<script lang="ts">
import Vue from 'vue';
import SlotsList, { SlotDefinitions } from '@kitchen/component/Slots';

const slots: SlotDefinitions = {
  default: {
    description: 'Any additional content. E.g., can be used instead of subtitle',
  },
  action: {
    description: 'The section with actions after default section',
  },
};

export default Vue.extend({
  components: {
    SlotsList,
  },
  data: () => ({
    slots,
  }),
});
</script>
