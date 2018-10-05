<template>
  <container>
    <h2>Accordion</h2>
    <p>Accordions are used to toggle sections of content.</p>

    <basic />
    <multiple />
    <checked />
    <reactive />
    
    <props />
    <slots />
    <events />
  </container>
</template>

<script lang="ts">
import Vue from 'vue';

import Basic from './Basic.vue';
import Checked from './Checked.vue';
import Events from './Events.vue';
import Multiple from './Multiple.vue';
import Props from './Props.vue';
import Reactive from './Reactive.vue';
import Slots from './Slots.vue';

export default Vue.extend({
  components: {
    Basic,
    Checked,
    Props,
    Slots,
    Events,
    Reactive,
    Multiple,
  },
});
</script>
