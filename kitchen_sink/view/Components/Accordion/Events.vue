<template>
  <events-list :events="events" />
</template>

<script lang="ts">
import Vue from 'vue';
import EventsList, { EventDefinitions } from '@kitchen/component/Events';

const events: EventDefinitions = {
  check: {
    // tslint:disable-next-line:max-line-length
    description: 'Emits checked item(s). Use turns into a reactive component that does not have an internal state',
    payload: 'string | number | string[] | number[]',
  },
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
