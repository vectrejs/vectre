<template>
  <ul class="nav">
    <li class="nav-item" v-for="(item, index) in items" :key="index" :class="itemCssClass(item)">
      <slot v-if="$scopedSlots.default" :item="item" :index="index" />
      <a v-else :href="item.path">{{item.text}}</a>

      <template v-if="Array.isArray(item.items) && level != 0">

        <vs-nav v-if="$scopedSlots.default" :items="item.items" :level="level - 1">
          <template slot-scope="{item, index}">
            <slot :item="item" :index="index" />
          </template>
        </vs-nav>

        <vs-nav v-else :items="item.items" :level="level - 1" />
      </template>
    </li>
  </ul>
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component({
  name: 'vs-nav',
})
export default class extends vue {
  @Prop({ type: Array, required: true })
  private items: any[];

  @Prop({ type: [Number, String], default: -1 })
  private level: number | string;

  private itemCssClass({ active = false }: { active: boolean }): string[] {
    return [
      active ? 'active' : '',
    ];
  }
}
</script>

