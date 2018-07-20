<template>
  <div class="slots"> 
    <h3>Slots</h3>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Scope</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(slot, key) in slots" :key="key">
          <td>{{ key }}<sup v-if="slot.required">*</sup></td>
          <td v-html="slot.description"></td>
          <td>{{ slot.scope || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SlotDefinition, SlotDefinitions } from "./defs";

export default Vue.extend({
  props: {
    slots: {
      type: Object,
      required: true
    }
  },
});
</script>
