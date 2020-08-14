<template>
  <ul class="nav">
    <li v-for="(item, index) in items" :key="index" class="nav-item" :class="itemCssClass(item)">
      <slot v-if="$scopedSlots.default" :item="item" :index="index" />
      <a v-else :href="item.path">{{ item.text }}</a>

      <template v-if="Array.isArray(item.items) && level != 0">
        <navigation v-if="$scopedSlots.default" :items="item.items" :level="level - 1">
          <template slot-scope="{ item: subitem, index: subindex }">
            <slot :item="subitem" :index="subindex" />
          </template>
        </navigation>

        <navigation v-else :items="item.items" :level="level - 1" />
      </template>
    </li>
  </ul>
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component({
  name: 'Navigation',
})
export default class Navigation extends vue {
  @Prop({ type: Array, required: true })
  public items: any[];

  @Prop({ type: [Number, String], default: -1 })
  public level: number | string;

  private itemCssClass({ active = false }): string[] {
    return [active ? 'active' : ''];
  }
}
</script>
