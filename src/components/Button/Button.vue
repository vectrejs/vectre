<template>
  <button 
    class="btn" :class="cssClass"
    v-on="$listeners"
  >
    <icon v-if="icon && left" :type="icon" />
    <slot />
    <icon v-if="icon && !left" :type="icon" />
  </button>
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { Type } from './Type';
import { Size } from './Size';
import { State } from './State';
import { Icon, Type as IconType } from '@components/Icon';

@Component({
  components: { Icon },
})
export default class extends vue {
  @Prop(String)
  private type: Type;

  @Prop(String)
  private size: Size;

  @Prop(String)
  private icon: IconType;

  @Prop(String)
  private state: State;

  @Prop(Boolean)
  private left: boolean;

  get cssClass(): string[] {
    return [
      Type[this.type as any] || this.type,
      Size[this.size as any] || this.size,
      State[this.state as any] || this.state,
    ];
  }
}
</script>
