<template>
  <slots-list :slots="slots" />
</template>

<script lang="ts">
import SlotsList, { SlotDefinitions } from '@kitchen/component/Slots';
import Vue from 'vue';

const slots: SlotDefinitions = {
  default: {
    description: 'Used to show "custom" items',
    scope: 'item = { value, key, index }',
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
