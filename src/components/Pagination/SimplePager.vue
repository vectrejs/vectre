<template>
  <ul class="pagination">
    <li v-if="previous" class="page-item page-prev">
      <a @click="change(previous)">
        <div class="page-item-subtitle">Previous</div>
        <div class="page-item-title h5">{{ previous }}</div>
      </a>
    </li>
    <li v-if="next" class="page-item page-next">
      <a @click="change(next)">
        <div class="page-item-subtitle">Next</div>
        <div class="page-item-title h5">{{ next }}</div>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class extends vue {
  @Prop({ type: Array, required: true })
  private pages: string[];

  @Prop()
  private current: string;

  public get previous(): string {
    return this.pages[this.curIndex - 1];
  }

  public get next(): string {
    return this.pages[this.curIndex + 1];
  }

  public change(page: string): void {
    this.$emit('change', page);
  }

  private get curIndex(): number {
    return this.pages.indexOf(this.current);
  }
}
</script>
