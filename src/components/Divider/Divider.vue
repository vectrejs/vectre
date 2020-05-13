<template>
  <div class="text-center" :class="{ divider: !vert, 'divider-vert': vert }" :data-content="dataContent"></div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class Divider extends Vue {
  @Prop(Boolean)
  public vert: boolean;

  @Prop(String)
  public content: string;

  public get dataContent(): string | undefined {
    return this.content || (this.$slots.default && this.$slots.default[0].text);
  }
}
</script>
