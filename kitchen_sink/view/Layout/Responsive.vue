<template>
  <container>
    <h2 class="title">Responsive</h2>
    <p>
      Spectre provides a responsive layout grid 
      system and responsive visibility utilities.
    </p>

    <columns>
      <column col=10 lg=8 md=6 sm=4>
        <div class="bg-gray block">col=10 <br> lg=8 <br> md=6 <br> sm=4</div>
      </column>
      <column col=2 lg=4 md=6 sm=8>
        <div class="bg-gray block">col=2 <br> lg=4 <br> md=6 <br> sm=8</div>
      </column>
    </columns>
    
    <prism language="html" :code="basic" />

    <p>
      There are <kbd>xs</kbd>, <kbd>sm</kbd>, <kbd>md</kbd>, <kbd>lg</kbd> 
      and <kbd>xl</kbd> props for flexible grid across mobile, tablet and 
      desktop viewport usage
    </p>
    <ul>
      <li><kbd>xs</kbd> apply to window width smaller than or equal to <strong>480px</strong>.</li>
      <li><kbd>sm</kbd> apply to window width smaller than or equal to <strong>600px</strong>.</li>
      <li><kbd>md</kbd> apply to window width smaller than or equal to <strong>840px</strong>.</li>
      <li><kbd>lg</kbd> apply to window width smaller than or equal to <strong>960px</strong>.</li>
      <li><kbd>xl</kbd> apply to window width smaller than or equal to <strong>1280px</strong>.</li>
      <li><kbd>col</kbd> apply to all window width, including the width wider than <strong>1280px</strong>.</li>
    </ul>

    <h3 class="subtitle">Responsive container</h3>
    <p>
      The responsive layout also provides fixed-width containers. Use <kbd>grid</kbd> property of 
      <code>&lt;container&gt;</code> component for a fixed-width container with the specific max-width
    </p>
    <ul>
      <li><b>xs</b> is equal to <strong>480px</strong>.</li>
      <li><b>sm</b> is equal to <strong>600px</strong>.</li>
      <li><b>md</b> is equal to <strong>840px</strong>.</li>
      <li><b>lg</b> is equal to <strong>960px</strong>.</li>
      <li><b>xl</b> is equal to <strong>1280px</strong>.</li>
    </ul>

    <prism language="html" :code="responsiveContainer" />

  </container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    basic: `<columns>
  <column col=10 lg=8 md=6 sm=4>...</column>
  <column col=2 lg=4 md=6 sm=8>...</column>
</columns>`,
    responsiveContainer: `<!-- 100% width container with max-width set to 960px -->
<container grid="lg">
  <columns>
    ...
  </columns>
</container>`,
  }),
});
</script>

