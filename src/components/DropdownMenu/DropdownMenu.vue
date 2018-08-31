<template>
  <div class="dropdown" :class="cssClass">
    <btn
      class="dropdown-toggle" :class="btnCssClass"
      tabindex="0"
      :icon="btnIcon"
      :state="state"
      @focus="open"
      @blur="close"
    >
      {{ btnText }}
    </btn> 
    
    <vs-menu v-if="$scopedSlots.default" :items="items">
      <template  slot-scope="{item, index}" >
        <slot :item="item" :index="index" />
      </template>
    </vs-menu>
    <vs-menu v-else :items="items" />
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';
import { Menu } from '@components/Menu';
import { BtnType, BtnState } from '@components/Button';
import { IconType, Navigation as IconNavigation } from '@components/Icon';

@Component({
  components: { 'vs-menu': Menu },
})
export default class extends vue {
  @Prop({ type: [Object, Array], required: true })
  private items: IterableIterator<any>;

  @Prop(Boolean)
  private right: boolean;

  @Prop(String)
  private btnType: BtnType;

  @Prop(String)
  private btnText: string;

  @Prop({ type: String, default: IconNavigation.caret })
  private btnIcon: IconType;

  @Prop()
  private state: BtnState;

  public get cssClass(): string[] {
    return [
      this.right ? 'dropdown-right' : '',
    ];
  }

  public get btnCssClass(): string[] {
    return [
      BtnType[this.btnType as any],
    ];
  }

  private open(): void {
    this.$emit('opened');
  }

  private close(): void {
    this.$emit('closed');
  }
}
</script>
