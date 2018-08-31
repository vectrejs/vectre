<template>
  <span class="chip" :class="cssClass">
    <avatar v-if="avatar || initials" 
      :src="avatar" 
      :size="avatarSizes.sm" 
      :initials="initials"
    />

    {{text}}
    
    <a v-if="showClose()"
      @click="close" 
      class="btn btn-clear" 
      aria-label="Close" 
      role="button"
    />
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import { Avatar, AvatarSize } from '@components/Avatar';

@Component({
  components: { Avatar },
})
export default class extends Vue {
  @Prop({ type: String, required: true })
  private text: string;

  @Prop(String)
  private avatar: string;

  @Prop(String)
  private initials: string;

  @Prop(Boolean)
  private active: boolean;

  private avatarSizes = AvatarSize;

  public get cssClass(): string[] {
    return [
      this.active ? 'active' : '',
    ];
  }

  public close(): void {
    this.$emit('close');
  }

  protected showClose() {
    return !!this.$listeners.close;
  }
}
</script>
