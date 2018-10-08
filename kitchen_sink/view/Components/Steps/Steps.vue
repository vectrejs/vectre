<template>
  <component-view>
    <h2 class="title">Steps</h2>
    <p>Steps are progress indicators of a sequence of task steps.</p>
    <columns>
      <column col=8 xs=12>
        <steps :active="active">
          <step>Step 1</step>
          <step>Step 2</step>
          <step>Step 3</step>
          <step>Step 4</step>
          <step v-tooltip="'Finish'">Step 5</step>
        </steps>
      </column> 
      <column col=4 xs=2 mx>
        <btn @click="next">Next</btn>
      </column>
    </columns>
    <prism language="html" :code="html" />
    <prism language="javascript" :code="js" />
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { props } from './props';

export default Vue.extend({
  methods: {
    next() {
      this.active = (this.active + 1) % 6;
    },
  },
  data: () => ({
    props,
    active: 1,
    html: `<steps :active="active">
  <step>Step 1</step>
  <step>Step 2</step>
  <step>Step 3</step>
  <step>Step 4</step>
  <step v-tooltip="'Finish'">Step 5</step>
</steps>
<btn @click="next">Next</btn>`,
    js: `export default {
  methods: {
    next() {
      this.active = (this.active + 1) % 6;
    },
  },
  data: () => ({
    active: 1,
  }),
}`,
  }),
});
</script>
