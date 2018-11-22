<template>
  <button 
    class="btn" :class="cssClass"
    v-on="$listeners"
  >
    <icon v-if="icon && left" class="left" :type="icon" />
    <slot v-if="!action" />
    <icon v-if="icon && !left" :type="icon" />
  </button>
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { Type, Types } from './Type';
import { Size, Sizes } from './Size';
import { State, States } from './State';
import { Icon, IconType } from '../Icon';

@Component({
  components: { Icon },
})
export default class extends vue {
  @Prop(String)
  public type: Type;

  @Prop(String)
  public size: Size;

  @Prop(String)
  public icon: IconType;

  @Prop(String)
  public state: State;

  @Prop(Boolean)
  public left: boolean;

  @Prop(Boolean)
  public circle: boolean;

  @Prop(Boolean)
  public action: boolean;

  get cssClass(): string[] {
    return [
      Types[this.type] || this.type,
      Sizes[this.size] || this.size,
      States[this.state] || this.state,
      this.action && this.circle ? 's-circle' : '',
      this.action ? 'btn-action' : '',
    ];
  }

  public created() {
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
