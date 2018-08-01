<template>
  <slots-list :slots="slots" />
</template>

<script lang="ts">
import Vue from "vue";
import SlotsList, { SlotDefinitions } from "@kitchen/component/Slots";

const slots: SlotDefinitions = {
  default: { description: 'Another way to show custom data ', scope: '{ crumb }' }
};

export default Vue.extend({
  components: {
    SlotsList
  },
  data: () => ({
    slots
  })
});
</script>
