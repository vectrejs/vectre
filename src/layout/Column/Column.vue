<template>
  <div class="column" :class="cssClass">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

const sizeValidator = (size: number) =>
  size % 1 === 0 && size > 0 && size <= 12;

@Component
export default class extends Vue {
  @Prop(Boolean)
  public ml: boolean;

  @Prop(Boolean)
  public mx: boolean;

  @Prop(Boolean)
  public mr: boolean;

  @Prop({ type: [Number, String], validator: sizeValidator })
  public xs: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  public sm: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  public md: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  public lg: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  public xl: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  public col: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  public hide: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  public show: number;

  public get cssClass(): string[] {
    return [
      this.mr ? 'col-mr-auto' : '',
      this.ml ? 'col-ml-auto' : '',
      this.mx ? 'col-mx-auto' : '',
      this.xs ? `col-xs-${this.xs}` : '',
      this.sm ? `col-sm-${this.sm}` : '',
      this.md ? `col-md-${this.md}` : '',
      this.lg ? `col-lg-${this.lg}` : '',
      this.xl ? `col-xl-${this.xl}` : '',
      this.col ? `col-${this.col}` : '',
      this.hide ? `hide-${this.hide}` : '',
      this.show ? `show-${this.show}` : '',
    ];
  }
}
</script>
