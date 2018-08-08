<template>
  <events-list :events="events" />
</template>

<script lang="ts">
import EventsList, { EventDefinitions } from '@kitchen/component/Events';
import Vue from 'vue';

const events: EventDefinitions = {
  close: { description: 'Emitted when close button is clicked' },
};

export default Vue.extend({
  components: {
    EventsList,
  },
  data: () => ({
    events,
  }),
});
</script>
