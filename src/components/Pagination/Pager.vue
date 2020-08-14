<template>
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: current == 1 }">
      <a tabindex="-1" @click="previous">Previous</a>
    </li>
    <li v-for="(n, i) in items" :key="i" class="page-item page-item-num" :class="{ active: current == n }">
      <a @click="change(n)">{{ n }}</a>
    </li>
    <li class="page-item" :class="{ disabled: current == pages }">
      <a @click="next">Next</a>
    </li>
  </ul>
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

export type PagerItem = number | string;
const SEPARATOR = '...';

@Component({
  name: 'Pager',
})
export default class Pager extends vue {
  @Prop({ type: [Number], required: true })
  public pages: number;

  @Prop({ type: [Number], default: 1 })
  public current: number;

  @Prop({ type: Number, default: 6 })
  public show: number;

  public get items(): PagerItem[] {
    const half = Math.round((this.show + 1) / 2);

    if (this.current <= half) {
      return [...Array.from({ length: this.show - 1 }, (v, i) => i + 1), ...[SEPARATOR, this.pages]];
    }

    if (this.current + half > this.pages) {
      return [...[1, SEPARATOR], ...Array.from({ length: this.show - 1 }, (v, i) => this.pages - this.show + 2 + i)];
    }

    const mediana = Math.floor((this.show - 4) / 2);
    return [
      ...[1, SEPARATOR],
      ...Array.from({ length: this.show - 3 }, (v, i) => this.current - mediana + i),
      ...[SEPARATOR, this.pages],
    ];
  }

  public change(current: number): void {
    this.$emit('change', current);
  }

  public next(): void {
    this.$emit('change', this.current + 1);
  }

  public previous(): void {
    this.$emit('change', this.current - 1);
  }
}
</script>
