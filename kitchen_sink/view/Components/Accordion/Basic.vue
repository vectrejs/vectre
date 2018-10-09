<template>
  <div class="section">
    <h3 class="subtitle">Basic use</h3>
    <columns>
      <column col=4 xs=8>
        <accordion
          :items="items"
          :checked="checked"
          @check="checked = $event"
          icon="icon-arrow-right"
          multiple
        />
      </column>
    </columns>
    <prism language="html" :code="html" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Navigation } from '@components/Icon';

export default Vue.extend({
  data: () => ({
    checked: ['Fact 1'],
    icon: Navigation.right,
    html: `<accordion
  :items="{'Fact 1': '...', 'Fact 2': '...', 'Fact 3': '...'}"
  checked="Fact 1"
  icon="icon-arrow-right"
  multiple
 />`,
    items: {
      'Fact 1': `The term "astronaut" comes from greek words that mean "star" and "sailor"`,
      'Fact 2': `In 1889, the queen of italy, margherita savoy, ordered the first pizza delivery.`,
      'Fact 3': `A cat's tail contains nearly 10 percent of all the bones in its body.`,
    },
  }),
});
</script>
