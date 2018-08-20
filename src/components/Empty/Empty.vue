<template>
  <div class="empty">
  
    <div v-if="icon" class="empty-icon">
      <icon :type="icon" :size="iconSizes.x3" />
    </div>

    <p v-if="title" class="empty-title h5">{{title}}</p>
  
    <p v-if="sub" class="empty-subtitle">{{sub}}</p>
  
    <div v-if="$slots.default" class="empty-content">
      <slot />
    </div>
    

    <div v-if="$slots.action" class="empty-action">
      <slot name="action" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Icon, IconSize, IconType } from '@components/Icon';
import { Prop } from 'vue-property-decorator';

@Component({
  components: { Icon },
})
export default class extends Vue {
  @Prop(String)
  private title: string;

  @Prop(String)
  private sub: string;

  @Prop(String)
  private icon: IconType;

  private iconSizes = IconSize;
}
</script>
