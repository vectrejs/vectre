<template>
  <events-list :events="events" />
</template>

<script lang="ts">
import EventsList, { EventDefinitions } from '@kitchen/component/Events';
import Vue from 'vue';

const events: EventDefinitions = {
  opened: { description: 'Emitted when button was clicked and menu is shown' },
  closed: { description: 'Emitted when you click anywhere during the menu dispaly' },
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
