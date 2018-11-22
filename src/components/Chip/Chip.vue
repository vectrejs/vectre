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
import { Avatar, AvatarSizes } from '../Avatar';

@Component({
  components: { Avatar },
})
export default class extends Vue {
  @Prop({ type: String, required: true })
  public text: string;

  @Prop(String)
  public avatar: string;

  @Prop(String)
  public initials: string;

  @Prop(Boolean)
  public active: boolean;

  private avatarSizes = AvatarSizes;

  public get cssClass(): string[] {
    return [
      this.active ? 'active' : '',
    ];
  }

  public close(): void {
    this.$emit('close');
  }

  public showClose(): boolean {
    return !!this.$listeners.close;
  }
}
</script>
