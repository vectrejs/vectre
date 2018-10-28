<template>
  <component-view>
    <h2 class="title">Labels <code>&lt;vs-label&gt;</code></h2>
    <p>Labels are formatted text tags for highlighted, informative information.</p>

    <vs-label>default</vs-label>
    <vs-label type="primary">primary</vs-label>
    <vs-label type="secondary">secondary</vs-label>
    <vs-label type="warning">warning</vs-label>
    <vs-label type="success">success</vs-label>
    <vs-label type="error">error</vs-label>
    <prism language="html" :code="basicHtml" />

    <h5 class="subtitle">Rounded label</h5>
    <p>
      Just add <kbd>rounded</kbd> prop to make a label rounded
    </p>
    <vs-label rounded>default</vs-label>
    <vs-label type="primary" rounded>primary</vs-label>
    <prism language="html" :code="roundedHtml" />

  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { props } from './props';

export default Vue.extend({
  data: () => ({
    props,

    basicHtml: `<vs-label>default</vs-label>
<vs-label type="primary">primary</vs-label>
<vs-label type="secondary">secondary</vs-label>
<vs-label type="warning">warning</vs-label>
<vs-label type="success">success</vs-label>
<vs-label type="error">error</vs-label>`,

    roundedHtml: `<vs-label rounded>default</vs-label>
<vs-label type="primary" rounded>primary</vs-label>`,
  }),
});
</script>

