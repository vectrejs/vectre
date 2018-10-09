<template>
  <div class="section">
    <h3 class="subtitle">Stateless component</h3>
    <columns>
      <column col=6 xs=8>
        <accordion :items="items" :checked="checkedFact" @check="checkedFact = $event" />
      </column>
    </columns>
    <prism language="html" :code="html" />
    <prism language="javascript" :code="js" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    html: `<accordion
  :items="items"
  :checked="checkedFact"
  @check="checkedFact = $event"
/>`,
    js: `export default Vue.extend({
  data: () => ({
    checkedFact: ['Fact 9'],
    items: {
      'Fact 9': '...',
      'Fact 10': '...',
    },
  }),
});`,
    checkedFact: 'Fact 9',
    items: {
      'Fact 9': `To cook an egg, a sidewalk needs to be 158°f`,
      'Fact 10': `Corn is grown on every continent except antarctica.`,
    },
  }),
});
</script>
