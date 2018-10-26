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
import { Type } from './Type';
import { Size } from './Size';
import { State } from './State';
import { Icon, IconType } from '@components/Icon';

@Component({
  components: { Icon },
})
export default class extends vue {
  @Prop(String)
  private type: keyof typeof Type;

  @Prop(String)
  private size: Size;

  @Prop(String)
  private icon: IconType;

  @Prop(String)
  private state: State;

  @Prop(Boolean)
  private left: boolean;

  @Prop(Boolean)
  private circle: boolean;

  @Prop(Boolean)
  private action: boolean;

  get cssClass(): string[] {
    return [
      Type[this.type as any] || this.type,
      Size[this.size as any] || this.size,
      State[this.state as any] || this.state,
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
