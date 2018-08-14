<template>
  <container>
    <slot />

    <props-list v-if="props" :props="props" />
    <slots-list v-if="slots" :slots="slots" />
    <events-list v-if="events" :events="events" />
  </container>  
</template>

<script lang="ts">
import EventsList, { EventDefinitions } from '@kitchen/component/Events';
import PropsList, { PropDefinitions } from '@kitchen/component/Props';
import SlotsList, { SlotDefinitions } from '@kitchen/component/Slots';

export default {
  components: { EventsList, PropsList, SlotsList },
  props: {
    events: {} as EventDefinitions,
    props: {} as PropDefinitions,
    slots: {} as SlotDefinitions,
  },
};
</script>
