<template>
  <div class="section">
    <h3>Stateless component</h3>
    <p></p>

    <accordion :items="{One: 'Uno', Two: 'Dos'}" :checked="checkedNumber" @check="checkedNumber = $event" />
    <prism language="html" :code="html" />
    <prism language="javascript" :code="js" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    checkedNumber: "One",
    html: `<accordion 
  :items="{One: 'Uno', Two: 'Dos'}" 
  :checked="checkedNumber" 
  @check="checkedNumber = $event" 
/>`,
    js: `export default Vue.extend({
  data: () => ({
    checkedNumber: ['One'],
  }),
});
`
  })
});
</script>
