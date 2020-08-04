<template>
  <ul class="menu">
    <template v-for="(value, key) in items">
      <li v-if="value.divider" :key="key" :data-content="normalizeDivider(value.divider)" class="divider" />

      <li v-else :key="key" class="menu-item">
        <badge v-if="value.badge" :value="value.badge" />

        <slot v-if="$scopedSlots.default" :item="value" :index="key" />

        <a v-else :href="value.path" :class="cssClassLinkItem(key)">{{ value.text }}</a>
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
export default class VerticalMenu extends vue {
  @Prop({ type: [Array, Object], required: true })
  public items: Record<string, unknown>[];

  @Prop({ type: [String, Number], default: '' })
  public active: string | number;

  protected normalizeDivider(divider: string | boolean): string {
    return typeof divider === 'string' ? divider : '';
  }

  protected cssClassLinkItem(current: string | number): string[] {
    return [this.active.toString() === current.toString() ? 'active' : ''];
  }
}
</script>
