<template>
  <div class="tile" :class="{'tile-centered': compact}">
    <div class="tile-icon">
      <slot v-if="$slots.icon" />
      <avatar v-else-if="avatar || initials" :src="avatar" :initials="initials" :size="avatarSize" />
      <icon v-else-if="icon" :size="iconSize" :type="icon" />
    </div>
    <div class="tile-content">
      <p v-if="title" class="tile-title" v-html="title" />
      <p v-if="subtitle" class="tile-subtitle text-gray" v-html="subtitle" />
      <p v-if="$slots.default"><slot /></p>
    </div>
    <div v-if="$slots.actions" class="tile-action">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { Avatar, AvatarSize } from '@components/Avatar';
import { Icon, IconType, IconSize } from '@components/Icon';

@Component({
  components: { Icon, Avatar },
})
export default class extends vue {
  @Prop(String)
  private title: string;

  @Prop(String)
  private subtitle: string;

  @Prop(String)
  private avatar: string;

  private avatarSize = AvatarSize.lg;

  @Prop(String)
  private initials: string;

  @Prop(String)
  private icon: IconType;

  private iconSize = IconSize.x2;

  @Prop({ type: Boolean, default: false })
  private compact: boolean;
}
</script>

<style>
.tile .tile-icon .icon {
  display: flex;
  height: 2rem;
  width: 2rem;
}
</style>

