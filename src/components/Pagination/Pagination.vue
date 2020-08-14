<template>
  <pager v-if="!Array.isArray(pages)" :pages="pages" :current="current" :show="show" @change="change" />

  <simple-pager v-else :pages="pages" :current="current" @change="change" />
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import SimplePager from './SimplePager.vue';
import Pager from './Pager.vue';

@Component({
  name: 'Pagination',
  components: { SimplePager, Pager },
})
export default class Pagination extends vue {
  @Prop({ type: [Number, Array], required: true })
  public pages: number | string[];

  @Prop({ type: [Number, String] })
  public current: number | string;

  @Prop({ type: Number })
  public show: number;

  public change(current: number): void {
    this.$emit('update:current', current);
  }
}
</script>

<style>
.page-item-num {
  min-width: 1.4rem;
}

@media (min-width: 640px) {
  .page-item-num {
    min-width: 1.7rem;
  }
}

.page-item a {
  cursor: pointer;
  user-select: none;
}
</style>
