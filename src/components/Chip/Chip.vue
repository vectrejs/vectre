<template>
  <span class="chip" :class="cssClass">
    <avatar v-if="avatar || initials" :src="avatar" :size="small ? avatarSizes.sm : undefined" :initials="initials" />
    {{ text }}
    <a v-if="showClose()" class="btn btn-clear" aria-label="Close" role="button" @click="close" />
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Avatar, AvatarSizes } from '../Avatar';

@Component({
  components: { Avatar },
})
export default class Chip extends Vue {
  @Prop({ type: String, required: true })
  public text: string;

  @Prop(String)
  public avatar: string;

  @Prop(String)
  public initials: string;

  @Prop(Boolean)
  public active: boolean;

  @Prop({ type: Boolean, default: true })
  public small: boolean;

  private avatarSizes = AvatarSizes;

  public get cssClass(): string[] {
    return [this.active ? 'active' : ''];
  }

  public close(): void {
    this.$emit('close');
  }

  public showClose(): boolean {
    return !!this.$listeners.close;
  }
}
</script>
