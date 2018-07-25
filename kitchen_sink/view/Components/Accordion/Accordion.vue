<template>
  <div>
    <h2>Accordion</h2>
    <p>Accordions are used to toggle sections of content.</p>

    <basic />
    <multiple />
    <checked />
    <reactive />
    
    <props />
    <slots />
    <events />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Navigation } from "@components/Icon";

import Basic from './Basic.vue';
import Checked from './Checked.vue';
import Props from './Props.vue';
import Slots from './Slots.vue';
import Events from './Events.vue';
import Reactive from './Reactive.vue';
import Multiple from './Multiple.vue';

export default Vue.extend({
  components: {
    Basic,
    Checked,
    Props,
    Slots,
    Events,
    Reactive,
    Multiple
  },
  data: () => ({
    icon: Navigation.right,
    multipleHtml: `
<accordion :items="items" multiple>
    `,
    jsCode: `
import Vue from 'vue';
import { Accordion } from 'vectre';

export default Vue.extend({
  components: {
    Accordion,
  },
  data: () => ({
    items: {
      Elements: "Text about elements",
      Layout: "Layout 1",
      Components: "Components 1",
    }
  })
});
      `,
    items: {
      Elements: "Text about elements",
      Layout: "Layout 1",
      Components: "Components 1",
    }
  })
});
</script>
