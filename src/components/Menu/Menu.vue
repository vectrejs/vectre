<template>
  <ul class="menu">
    <template v-for="(value, key, index) in items">
      <li v-if="value.divider" 
        :key="index || key" 
        :data-content="normalizeDivider(value.divider)" 
        class="divider" 
      />
      
      <li v-else class="menu-item" :key="index || key" >
        <badge v-if="value.badge" :value="value.badge" />

        <slot v-if="$scopedSlots.default" :item="value" :index="key || index" />
        <a v-else :href="value.path" :class="cssClassLinkItem(key || index)">
          {{ value.text }}
        </a>
      </li>
    </template>
  </ul>
</template>
<script lang="ts">
import vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Badge from './Badge.vue';

@Component({
  components: { Badge },
})
export default class extends vue {
  @Prop({ type: [Array, Object], required: true })
  private items: object[];

  @Prop({ type: [String, Number], default: '' })
  private active: string | number;

  public normalizeDivider(divider: string | boolean): string {
    return typeof divider === 'string' ? divider : '';
  }

  public cssClassLinkItem(current: string | number): string[] {
    return [
      this.active.toString() === current.toString() ? 'active' : '',
    ];
  }
}
</script>
