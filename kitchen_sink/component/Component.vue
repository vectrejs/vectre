<template>
  <container>
    <slot />

    <template v-if="$parent.$data.props">
      <props-list v-if="Array.isArray($parent.$data.props)" 
        v-for="(list, name) in $parent.$data.props" 
        :key="name"  
        :props="list.props"
        :name="list.name" 
      />
      <props-list v-else :props="$parent.$data.props" />
    </template>

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
