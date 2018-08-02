<template>
  <props-list :props="props" />
</template>

<script lang="ts">
import Vue from "vue";
import PropsList, { PropDefinitions } from "@kitchen/component/Props";

const props: PropDefinitions = {
  title: { type: "String", description: "Title" },
  sub: { type: "String", description: "Subtitle" },
  icon: { type: "String", description: "Icon" }
};

export default Vue.extend({
  components: { PropsList },
  data: () => ({ props })
});
</script>
