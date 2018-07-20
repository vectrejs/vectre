<template>
  <slots-list :slots="slots" />
</template>

<script lang="ts">
import Vue from 'vue';
import SlotsList, { SlotDefinitions } from "@kitchen/component/Slots";

export default Vue.extend({
  components: {
    SlotsList,
  },
  data: () => ({
    slots: <SlotDefinitions> {
      header: { scope: 'item="{ value, key, index }"' },
      body: { scope: 'item="{ value, key, index }"' },
      default: { scope: 'item="{ value, key, index }"' },
    },
  })
})
</script>
