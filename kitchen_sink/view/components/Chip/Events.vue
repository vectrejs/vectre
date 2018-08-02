<template>
  <events-list :events="events" />
</template>

<script lang="ts">
import Vue from "vue";
import EventsList, { EventDefinitions } from "@kitchen/component/Events";

const events: EventDefinitions = {
  close: { description: "Emitted when close button is clicked" }
};

export default Vue.extend({
  components: {
    EventsList
  },
  data: () => ({
    events
  })
});
</script>
