<template>
  <component-view>
    <flexbox-grid id="flex" />
    <responsive id="responsive" />
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import FlexboxGrid from './Flexbox.vue';
import Responsive from './Responsive.vue';
import { props } from './props';

export default Vue.extend({
  components: {
    FlexboxGrid,
    Responsive,
  },
  data: () => ({
    props,
  }),
});
</script>


<style lang="scss" scoped>
/deep/ .block {
  padding: 0.4rem;

  &.bg-gray {
    background: #f0f1f4;
  }
}

@media (max-width: 600px) {
  /deep/ .block {
    padding: 0.4rem 0.1rem;
  }
}
</style>
