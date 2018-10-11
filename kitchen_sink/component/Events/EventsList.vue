<template>
  <div class="props table-responsive">
    <h3 class="subtitle">{{ name }} Events</h3>

    <table class="table">
      <col style="width: 10%">
      <col style="width: 50%">
      <col style="width: 40%">
      <thead>
        <tr>
          <th>Event</th>
          <th>Description</th>
          <th>Payload</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, key) in events" :key="key">
          <td>{{ key }}</td>
          <td v-html="event.description"></td>
          <td>{{ event.payload }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    name: {
      type: String,
    },
    events: {
      type: Object,
      required: true,
    },
  },
});
</script>
