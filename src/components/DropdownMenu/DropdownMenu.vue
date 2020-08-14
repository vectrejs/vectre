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
    >
      {{ btnText }}
    </btn>

    <vertical-menu v-if="$scopedSlots.default" :items="items">
      <template slot-scope="{ item, index }">
        <slot :item="item" :index="index" />
      </template>
    </vertical-menu>
    <vertical-menu v-else :items="items" />
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { VerticalMenu } from '../VerticalMenu';
import { BtnType, BtnState, BtnTypes } from '../Btn';
import { IconType, IconNavigation } from '../Icon';

@Component({
  name: 'DropdownMenu',
  components: { VerticalMenu },
})
export default class DropdownMenu extends vue {
  @Prop({ type: [Object, Array], required: true })
  public items: [];

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
