<template>
  
      <column col=9 lg=12 mr>
        <slot />

        <template v-if="$parent.$data.props">
          <template v-if="isMultiplePropsLists()">
            <props-list 
              v-for="(list, name) in $parent.$data.props" 
              :key="name"  
              :props="list.props"
              :name="list.name" 
            />
          </template>
          <props-list v-else :props="$parent.$data.props" />
        </template>

        <slots-list v-if="$parent.$data.slots" :slots="$parent.$data.slots" />
        <events-list v-if="$parent.$data.events" :events="$parent.$data.events" />
      </column>
 
  
</template>

<script lang="ts">
import vue from 'vue';
import EventsList, { EventDefinitions } from '@kitchen/component/Events';
import PropsList, { PropDefinitions } from '@kitchen/component/Props';
import SlotsList, { SlotDefinitions } from '@kitchen/component/Slots';

export default vue.extend({
  components: { EventsList, PropsList, SlotsList },
  methods: {
    isMultiplePropsLists(): boolean {
      return Array.isArray(this.$parent.$data.props);
    },
  },
});
</script>