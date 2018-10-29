<template>
  <column col=10 lg=10 sm=11 xs=12 mr>
    <slot />

    <props-list
      v-if="props" 
      v-for="(list, k) in props" 
      :key="'props' + k"  
      :props="list.props"
      :name="list.name" 
    />

    <slots-list
      v-if="slots"
      v-for="(list, k) in slots"
      :key="'slots' + k"
      :slots="list.slots"
      :name="list.name"
    />

    <events-list
      v-if="events"
      v-for="(list, k) in events"
      :key="'events' + k"
      :name="list.name"
      :events="list.events"
    />
  </column>
</template>

<script lang="ts">
import vue from 'vue';
import EventsList, { EventDefinitions } from '@kitchen/component/Events';
import PropsList, { PropDefinitions } from '@kitchen/component/Props';
import SlotsList, { SlotDefinitions } from '@kitchen/component/Slots';

export default vue.extend({
  components: { EventsList, PropsList, SlotsList },
  computed: {
    props(): any[] | undefined {
      const props = this.$parent.$data.props;
      if (this.isMultipleLists(props)) {
        return props;
      }

      return props ? [{ props }] : void(0);
    },

    slots(): any[] | undefined {
      const slots = this.$parent.$data.slots;

      if (this.isMultipleLists(slots)) {
        return slots;
      }

      return slots ? [{ slots }] : void(0);
    },

    events(): any[] | undefined {
      const events = this.$parent.$data.events;

      if (this.isMultipleLists(events)) {
        return events;
      }

      return events ? [{ events }] : void(0);
    },
  },
  methods: {
    isMultipleLists(list: any[]): boolean {
      return Array.isArray(list);
    },
  },
});
</script>