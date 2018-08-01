<template>
  <span class="chip">
    <avatar v-if="avatar" :src="avatar" :size="avatarSizes.sm" />
    {{text}}
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import  Avatar, { Size as AvatarSize } from '@components/Avatar'

@Component({
  components: { Avatar }
})
export default class extends Vue {
  @Prop(String)
  private text: string;

  @Prop(String)
  private avatar: string;

  private avatarSizes = AvatarSize;

}
</script>
