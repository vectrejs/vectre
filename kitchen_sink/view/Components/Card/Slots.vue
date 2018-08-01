<template>
  <slots-list :slots="slots" />
</template>

<script lang="ts">
import Vue from "vue";
import SlotsList, { SlotDefinitions } from "@kitchen/component/Slots";

const slots: SlotDefinitions = {
  header: {
    description: "The topmost section",
  },
  body: {
    description: "Slot goes after the header",
  },
  footer: {
    description: "Slot goes after the body",
  },
  default: {
    description: "An alias for body"
  }
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
