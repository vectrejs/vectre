<template>
  <div class="dropdown" :class="cssClass">
    <btn
      class="dropdown-toggle"
      :class="btnCssClass"
      tabindex="0"
      :icon="btnIcon"
      :state="state"
      @focus="open"
      @blur="close"
    >{{ btnText }}</btn>

    <vertical-menu v-if="$scopedSlots.default" :items="items">
      <template slot-scope="{item, index}">
        <slot :item="item" :index="index" />
      </template>
    </vertical-menu>
    <vertical-menu v-else :items="items" />
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import { Component, Prop, Emit } from 'vue-property-decorator';
import { VerticalMenu } from '../VerticalMenu';
import { BtnType, BtnState, BtnTypes } from '../Button';
import { IconType, Navigation as IconNavigation } from '../Icon';

@Component({
  components: { VerticalMenu },
})
export default class DropdownMenu extends vue {
  @Prop({ type: [Object, Array], required: true })
  public items: IterableIterator<any>;

  @Prop(Boolean)
  public right: boolean;

  @Prop(String)
  public btnType: BtnType;

  @Prop(String)
  public btnText: string;

  @Prop({ type: String, default: IconNavigation.caret })
  public btnIcon: IconType;

  @Prop()
  public state: BtnState;

  public get cssClass(): string[] {
    return [this.right ? 'dropdown-right' : ''];
  }

  public get btnCssClass(): string[] {
    return [BtnTypes[this.btnType]];
  }

  private open(): void {
    this.$emit('opened');
  }

  private close(): void {
    this.$emit('closed');
  }
}
</script>
