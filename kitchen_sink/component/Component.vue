<template>
  <container>
    <slot />

    <props-list v-if="$parent.$data.props" :props="$parent.$data.props" />
    <slots-list v-if="$parent.$data.slots" :slots="$parent.$data.slots" />
    <events-list v-if="$parent.$data.events" :events="$parent.$data.events" />
  </container>  
</template>

<script lang="ts">
import vue from 'vue';
import EventsList, { EventDefinitions } from '@kitchen/component/Events';
import PropsList, { PropDefinitions } from '@kitchen/component/Props';
import SlotsList, { SlotDefinitions } from '@kitchen/component/Slots';

export default vue.extend({
  components: { EventsList, PropsList, SlotsList },
});
</script>
