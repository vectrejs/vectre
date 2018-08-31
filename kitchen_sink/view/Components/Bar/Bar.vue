<template>
  <container>
    <h2>Bars</h2>
    <p>Bars represent the progress of a task or the value within the known range.</p>

    <h3>Basic use</h3>
    <bar :value=25 tooltip="%" />
    <prism language="html" :code="basic" />

    <h3>Advanced</h3>
    <bar :value="now" :min="min" :max="max" :tooltip="tooltip"/>
    <prism language="html" :code="advancedHtml" />
    <prism language="js" :code="advancedJs" />

    <h3>Slim</h3>
    <p>There is <code>sm</code> prop for thinner Bars</p>
    <bar :value=76 sm />
    <prism language="html" :code="`<bar :value=76 sm />`" />
    <props />
  </container>
</template>

<script lang="ts">
import Vue from 'vue';
import { setInterval, clearInterval } from 'timers';
import Props from './Props.vue';

export default Vue.extend({
  components: {
    Props,
  },

  mounted() {
    const interval = setInterval(() => {
      if (this.now >= this.max) return clearInterval(interval);

      this.now += 1;
    },                           1000);
  },

  data: () => ({
    now: 10,
    min: 5,
    max: 400,
    tooltip(v: number) {
      return `${v} steps of ${this.max}`;
    },
    basic: `<bar :value="25" tooltip="%" />`,
    advancedHtml: `<bar :value="now" :max="max" :tooltip="tooltip"/>`,
    advancedJs: `export default Vue.extend({
  mounted: function () {
    const interval = setInterval(() => {
      if (this.now >= this.max) return clearInterval(interval)

      this.now += 1
    }, 1000);
  },

  data: () => ({
    now: 10,
    min: 5,
    max: 400,
    tooltip: function(v: number) {
      return \`\${v} steps of \${this.max}\`
    }
  })
});`,
  }),
});
</script>
