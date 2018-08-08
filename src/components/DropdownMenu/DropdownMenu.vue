<template>
  <div class="dropdown">
    <vs-menu :items="items" />
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Menu } from '../Menu';

@Component({
  components: { 'vs-menu': Menu },
})
export default class extends vue {
  @Prop({ type: [Object, Array], required: true })
  private items: IterableIterator<any>;

  @Prop(Boolean)
  private right: boolean;
}
</script>
