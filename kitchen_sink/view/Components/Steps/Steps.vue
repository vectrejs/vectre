<template>
  <component-view>
    <h2>Steps</h2>
    <p>Steps are progress indicators of a sequence of task steps.</p>
    <steps :active="2">
      <step v-tooltip="'Start'">Step 1</step>
      <step>Step 2</step>
      <step>Step 3</step>
      <step>Step 4</step>
      <step v-tooltip="'Finish'">Step 5</step>
    </steps>
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
});
</script>
