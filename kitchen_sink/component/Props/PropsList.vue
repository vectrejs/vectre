<template>
  <div class="props table-responsive"> 
    <h3 class="subtitle">{{ name }} Props</h3>

    <table class="table">
      <col style="width: 20%">
      <col style="width: 30%">
      <col style="width: 20%">
      <col style="width: 20%">
      <col style="width: 10%">
      <thead>
        <tr>
          <th>Property</th>
          <th>Description</th>
          <th>Default</th>
          <th>Accepted Values</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(prop, key) in props" :key="key">
          <td>{{ key }}<sup v-if="prop.required">*</sup></td>
          <td v-html="prop.description"></td>
          <td>{{ typeof prop.default != 'undefined' ? prop.default : '-' }}</td>
          <td v-html="prop.accepted || '-'"></td>
          <td>{{ prop.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    props: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
    },
  },
});
</script>
