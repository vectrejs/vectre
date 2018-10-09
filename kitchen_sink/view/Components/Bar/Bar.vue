<template>
  <component-view>
    <h2 class="title">Bars</h2>
    <p>Bars represent the progress of a task or the value within the known range.</p>

    <h3 class="subtitle">Basic use</h3>
    <bar :value=25 tooltip="%" />
    <prism language="html" :code="basic" />

    <h3 class="subtitle">Advanced</h3>
    <bar :value="now" :min="min" :max="max" :tooltip="tooltip"/>
    <prism language="html" :code="advancedHtml" />
    <prism language="js" :code="advancedJs" />

    <h3 class="subtitle">Slim</h3>
    <p>There is <code>sm</code> prop for thinner Bars</p>
    <bar :value=76 sm />
    <prism language="html" :code="`<bar :value=76 sm />`" />
    <props />
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { setInterval, clearInterval } from 'timers';
import { props } from './props';

export default Vue.extend({
  mounted() {
    const interval = setInterval(
      () => {
        if (this.now >= this.max) return clearInterval(interval);
        this.now = (this.now + 5) % this.max;
      },
      1000,
    );
  },

  data: () => ({
    props,
    now: 10,
    min: 5,
    max: 400,
    tooltip(currentStep: number) {
      return `${currentStep} steps of ${this.max}`;
    },
    basic: `<bar :value="25" tooltip="%" />`,
    advancedHtml: `<bar :value="now" :max="max" :tooltip="tooltip"/>`,
    advancedJs: `export default Vue.extend({
  mounted: function () {
    const interval = setInterval(() => {
      if (this.now >= this.max) return clearInterval(interval)

      this.now += 5
    }, 1000);
  },

  data: () => ({
    now: 10,
    min: 5,
    max: 400,
    tooltip: function(currentStep) {
      return \`\${currentStep} steps of \${this.max}\`
    }
  })
});`,
  }),
});
</script>
