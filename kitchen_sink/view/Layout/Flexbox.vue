<template>
  <container>
    <h2 class="title">Flexbox grid</h2>
    <p>Layout includes flexbox based responsive grid system with 12 columns.</p>
    
    <columns>
      <column v-for="i in 12" :key="i" col="1">
        <div class="bg-primary block" />
      </column>
    </columns>

    <columns>
      <column col=12>
        <div class="bg-gray block">col=12 (100%)</div>
      </column>
      <column col=9>
        <div class="bg-gray block">col=9 (75%)</div>
      </column>
      <column col=6>
        <div class="bg-gray block">col=6 (50%)</div>
      </column>
    </columns>

    <columns>
      <column col=3>
        <div class="bg-gray block">col=3 (25%)</div>
      </column>
    </columns>

    <prism language="html" :code="basic" />

    <p>
      Add the <code>columns</code> component to a <code>container</code>. 
      And add any element(s) you want with the <code>column</code> component. These 
      columns will take up the space equally. You can specific the width 
      of each column by adding <kbd>col</kbd> property
    </p>


    <h5 class="subtitle">Gapless columns</h5>
    <p>
      You can set <kbd>gapless</kbd> property of <code>columns</code> component 
      to have gapless columns. 
    </p>
    <columns gapless>
      <column col=6>
        <div class="bg-gray block">col=6</div>
      </column>
      <column col=6>
        <div class="bg-gray block">col=6</div>
      </column>
    </columns>
    <prism language="html" :code="gapless" />

    <h5 class="subtitle">One line columns</h5>
    <p>
      By default, Spectre grid has multi-line flexbox enabled. You can set 
      <kbd>oneline</kbd> property of <code>columns</code> to make all its 
      child columns positioned in one line
    </p>
    <columns oneline>
      <column col=8>
        <div class="bg-gray block">col=8</div>
      </column>
      <column col=12>
        <div class="bg-gray block">col=12</div>
      </column>
    </columns>
    <prism language="html" :code="oneline" />

    <h5 class="subtitle" id="offset">Grid offset</h5>
    <p>
      The Flexbox grid provides margin auto utilities to set offset. There are 
      <kbd>mx</kbd>, <kbd>ml</kbd> and <kbd>mr</kbd> properties to set margins between 
      columns without using empty columns.
    </p>
    <columns>
      <column col=2>
        <div class="bg-gray block">col=2</div>
      </column>
      <column col=4 mx>
        <div class="bg-gray block">col=4 mx</div>
      </column>
    </columns>
    <columns>
      <column col=2>
        <div class="bg-gray block">col=2</div>
      </column>
      <column col=4 ml>
        <div class="bg-gray block">col=4 ml</div>
      </column>
    </columns>
    <columns>
      <column col=4 ml>
        <div class="bg-gray block">col=4 ml</div>
      </column>
      <column col=2>
        <div class="bg-gray block">col=2</div>
      </column>
    </columns>
    <columns>
      <column col=4 mx>
        <div class="bg-gray block">col=4 mx</div>
      </column>
      <column col=2>
        <div class="bg-gray block">col=2</div>
      </column>
    </columns>
    <columns>
      <column col=4 mr>
        <div class="bg-gray block">col=4 mr</div>
      </column>
      <column col=2>
        <div class="bg-gray block">col=2</div>
      </column>
    </columns>
    <columns>
      <column col=4 mx>
        <div class="bg-gray block">col=4 mx</div>
      </column>
    </columns>
    <prism language="html" :code="gridoffset" />

    <h5 class="subtitle">Grid nesting</h5>
    <p>
      To nest grids, add the new <code>&lt;columns&gt;</code> and 
      <code>&lt;column&gt;</code> structure within an existing column.
    </p>

    <columns>
      <column col=6>
        <div class="bg-gray block">col=6</div>
        <columns>
          <column col=6>
            <div class="bg-primary block">col=6</div>
          </column>
          <column col=6>
            <div class="bg-primary block">col=6</div>
          </column>
        </columns>
      </column>
      <column col=6>
        <div class="bg-gray block">col=6</div>
      </column>
    </columns>
    <prism language="html" :code="nested" />

  </container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    basic: `<container>

  <columns>
    <column v-for="i in 12" :key="i" col="1">
      ...
    </column>
  </columns>

  <columns>
    <column col=12>...</column>
    <column col=9>...</column>
    <column col=6>...</column>
  </columns>

  <columns>
    <column col=3>...</column>
  </columns>

</container>`,

    gapless: `<columns gapless>
  <column col=6>...</column>
  <column col=6>...</column>
</columns>`,

    oneline: `<columns oneline>
  <column col=8>...</column>
  <column col=12>...</column>
</columns>`,

    gridoffset: `<columns>
  <column col=2>...</column>
  <column col=4 mx>...</column>
</columns>
<columns>
  <column col=2>...</column>
  <column col=4 ml>...</column>
</columns>
<columns>
  <column col=4 ml>...</column>
  <column col=2>...</column>
</columns>
<columns>
  <column col=4 mx>...</column>
  <column col=2>...</column>
</columns>
<columns>
  <column col=4 mr>...</column>
  <column col=2>...</column>
</columns>
<columns>
  <column col=4 mx>...</column>
</columns>`,

    nested: `<columns>
  <column col=6>
    ...
    <columns>
      <column col=6>
        <!-- nested blue tile -->
      </column>
      <column col=6>
        <!-- nested blue tile -->
      </column>
    </columns>
  </column>
  <column col=6>
    ...
  </column>
</columns>`,
  }),
});
</script>

