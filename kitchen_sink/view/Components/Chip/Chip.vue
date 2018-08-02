<template>
  <container>
    <h2>Chips</h2>
    <p>Chips are complex entities in small blocks.</p>
    
    <chip text="Arya Stark" />
    <chip text="Tyrion Lannister" active />
    <chip text="John Snow" avatar="https://picturepan2.github.io/spectre/img/avatar-1.png" />
    <chip text="Khal Drogo" initials="KD" />
    <chip v-if="alive" text="Ned Stark" @close="alive = false" />

    <prism language="html" :code="code" />
    <props />
    <events />
  </container>
</template>
<script lang="ts">
import Vue from 'vue'
import Props from "./Props.vue";
import Events from "./Events.vue";

export default Vue.extend({
  components: { Props, Events },
  
  data: () => ({
    alive: true,
    code: `<chip text="Arya Stark" />
<chip text="Tyrion Lannister" active />
<chip text="John Snow" avatar="img/avatar-1.png" />
<chip text="John Snow" initials="JS" />
<chip v-if="alive" text="Ned Stark" @close="alive = false" />
`
  })  
})
</script>

