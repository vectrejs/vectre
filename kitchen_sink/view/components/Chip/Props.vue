<template>
  <props-list :props="props" />
</template>

<script lang="ts">
import Vue from "vue";
import PropsList, { PropDefinitions } from "@kitchen/component/Props";

const props: PropDefinitions = {
  text: { type: "String", description: "Text", required: true },
  avatar: { type: "String", description: "URL of an avatar image" },
  initials: {
    type: "String",
    description:
      "Initials for avatars. Shown when avatar is not defined and automatically truncated to 2 characters"
  },
  active: { type: "Boolean", description: "Alters colors of chip" }
};

export default Vue.extend({
  components: { PropsList },
  data: () => ({ props })
});
</script>
