<template>
  <component-view>
    <h2 class="title">Chips</h2>
    <p>Chips are complex entities in small blocks.</p>
    
    <chip text="Arya Stark" />
    <chip text="Tyrion Lannister" active />
    <chip text="John Snow" avatar="https://picturepan2.github.io/spectre/img/avatar-1.png" />
    <chip text="Khal Drogo" initials="KD" />
    <chip v-if="alive" text="Ned Stark" @close="alive = false" />

    <prism language="html" :code="code" />
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { events } from './events';
import { props } from './props';

export default Vue.extend({
  data: () => ({
    props,
    events,
    alive: true,
    code: `<chip text="Arya Stark" />
<chip text="Tyrion Lannister" active />
<chip text="John Snow" avatar="img/avatar-1.png" />
<chip text="John Snow" initials="JS" />
<chip v-if="alive" text="Ned Stark" @close="alive = false" />
`,
  }),
});
</script>

