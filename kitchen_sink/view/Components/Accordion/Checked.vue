<template>
  <div class="section">
    <h3 class="subtitle">Checked by default</h3>
    <columns>
      <column col=4 xs=8>
        <accordion :items="items" checked=1 />
      </column>
    </columns>
    <prism language="html" :code="indexHtml" />

    <columns>
      <column col=4 xs=8>
        <accordion :items="items" checked="Fact 7" />
      </column>
    </columns>
    <prism language="html" :code="keyHtml" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    indexHtml: `<accordion :items="{'Fact 7': '...', 'Fact 8': '...'}" checked="1" />`,
    keyHtml: `<accordion :items="{'Fact 7': 'Uno', 'Fact 8': '...'}" checked="Fact 7" />`,
    items: {
      'Fact 7': `Hummingbirds' wings can beat up to 200 times a second.`,
      'Fact 8': `There are more than 1200 water parks in north america.`,
    },
  }),
});
</script>
