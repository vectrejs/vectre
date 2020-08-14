<template>
  <button class="btn" :class="cssClass" v-on="$listeners">
    <icon v-if="icon && left" class="left" :type="icon" />
    <slot v-if="!action" />
    <icon v-if="icon && !left" :type="icon" />
  </button>
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { BtnType, BtnTypes } from './Type';
import { BtnSizes, BtnSize } from './Size';
import { BtnState, BtnStates } from './State';
import { Icon, IconType } from '../Icon';

@Component({
  name: 'Btn',
  components: { Icon },
})
export default class Button extends vue {
  @Prop(String)
  public type: BtnType;

  @Prop(String)
  public size: BtnSize;

  @Prop(String)
  public icon: IconType;

  @Prop(String)
  public state: BtnState;

  @Prop(Boolean)
  public left: boolean;

  @Prop(Boolean)
  public circle: boolean;

  @Prop(Boolean)
  public action: boolean;

  get cssClass(): string[] {
    return [
      BtnTypes[this.type] || this.type,
      BtnSizes[this.size] || this.size,
      BtnStates[this.state] || this.state,
      this.action && this.circle ? 's-circle' : '',
      this.action ? 'btn-action' : '',
    ];
  }

  public created(): void {
    if (this.action && !this.icon) {
      throw new Error('Action button should have icon');
    }
  }
}
</script>

<style lang="scss">
.btn + .btn {
  margin-left: 0.4rem;
}

.btn {
  &:not(.btn-action) .icon {
    margin: 0 0 0 0.2rem;

    &.left {
      margin: 0 0.2rem 0 0;
    }
  }
}
</style>
