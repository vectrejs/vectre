<template>
  <pager v-if="!Array.isArray(pages)" 
    :pages="pages" 
    :current="current" 
    :show="show"
    @change="change" 
  />
  
  <simple-pager v-else 
    :pages="pages" 
    :current="current" 
    @change="change" 
  />
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import SimplePager from './SimplePager.vue';
import Pager from './Pager.vue';

@Component({
  components: { SimplePager, Pager },
})
export default class extends vue {
  @Prop({ type: [Number, Array], required: true })
  private pages: number | string[];

  @Prop({ type: [Number, String] })
  private current: number | string;

  @Prop({ type: Number })
  private show: number;

  public change(current: number): void {
    this.$emit('update:current', current);
  }
}
</script>