<template>
  <div class="dropdown" :class="cssClass">
    <a class="btn btn-link dropdown-toggle" tabindex="0" @focus="open" @blur="close">
      dropdown menu <i class="icon icon-caret"></i>
    </a>
    <vs-menu :items="items" />
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';
import { Menu } from '../Menu';

@Component({
  components: { 'vs-menu': Menu },
})
export default class extends vue {
  @Prop({ type: [Object, Array], required: true })
  private items: IterableIterator<any>;

  @Prop(Boolean)
  private right: boolean;

  public get cssClass(): string[] {
    return [
      this.right ? 'dropdown-right' : '',
    ];
  }

  @Emit('opened')
  private open(): void {}

  @Emit('closed')
  private close(): void {}
}
</script>
