<template>
  <div class="section">
    <h3>Basic use</h3>
    <accordion :items="{One: 'Uno', Two: 'Dos', Three: 'Tres'}" icon="icon-arrow-right" multiple :checked="checked" @check="checked = $event" />
    <prism language="html" :code="html" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Navigation } from "@components/Icon";

export default Vue.extend({
  data: () => ({
    checked: [0, "Three"],
    icon: Navigation.right,
    html: `<accordion 
  :items="{One: 'Uno', Two: 'Dos', Three: 'Tres'}" 
  :checked="[0, 'Three']"
  icon="icon-arrow-right" 
  multiple 
 />`,
    items: {
      Elements: "Text about elements",
      Layout: "Layout 1",
      Components: "Components 1"
    }
  })
});
</script>
