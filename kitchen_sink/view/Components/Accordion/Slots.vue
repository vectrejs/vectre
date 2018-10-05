<template>
  <slots-list :slots="slots" />
</template>

<script lang="ts">
import Vue from 'vue';
import SlotsList, { SlotDefinitions } from '@kitchen/component/Slots';

const slots: SlotDefinitions = {
  header: { scope: '{ item, key, index }' },
  body: { scope: '{ item, key, index }' },
  default: { scope: '{ item, key, index }' },
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
