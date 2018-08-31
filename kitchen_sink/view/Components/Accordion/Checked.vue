<template>
  <div class="section">
    <h3>Opened by default</h3>

    <accordion :items="{One: 'Uno', Two: 'Dos'}" checked="1" />
    <prism language="html" :code="indexHtml" />

    <accordion :items="a = {One: 'Uno', Two: 'Dos'}" checked="One" />
    <prism language="html" :code="keyHtml" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    indexHtml: `<accordion :items="{One: 'Uno', Two: 'Dos'}" checked="1" />`,
    keyHtml: `<accordion :items="{One: 'Uno', Two: 'Dos'}" checked="One" />`,
  }),
});
</script>
