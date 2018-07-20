<template>
  <div>
    <h2>Accordion</h2>
    <p>Accordions are used to toggle sections of content.</p>

    <basic />

    <h3>Multiple</h3>
    <accordion :items="items" multiple>
      <span slot="header" slot-scope="{ item: { key: title } }">{{ title }}</span>
      <span slot-scope="{ item:  { value: text } }">{{ text }}</span>
    </accordion>
    <prism language="html" :code="multipleHtml" />

    <checked />
    <props />
    <slots />

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Navigation } from "@components/Icon";

import Basic from './Basic.vue';
import Checked from './Checked.vue';
import Props from './Props.vue';
import Slots from './Slots.vue';

export default Vue.extend({
  components: {
    Basic,
    Checked,
    Props,
    Slots,
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
