<template>
  <props-list :props="props" />
</template>

<script lang="ts">
import Vue from 'vue';
import PropsList, { PropDefinitions } from '@kitchen/component/Props';

const props: PropDefinitions = {
  img: { type: 'String', description: 'URL of an image' },
  before: {
    type: 'String',
    description: 'A postion of an image',
    accepted: 'header | body | footer',
  },
  after: {
    type: 'String',
    description: 'A postion of an image',
    accepted: 'header | body | footer',
  },
};

export default Vue.extend({
  components: { PropsList },
  data: () => ({ props }),
});
</script>
