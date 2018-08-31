<template>
  <div class="column" :class="cssClass">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

const sizeValidator = (size: number) =>
  size % 1 === 0 && size > 0 && size <= 12;

@Component
export default class extends Vue {
  @Prop(Boolean) private ml: boolean;

  @Prop(Boolean) private mx: boolean;

  @Prop(Boolean) private mr: boolean;

  @Prop({ type: [Number, String], validator: sizeValidator })
  private xs: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  private sm: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  private md: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  private lg: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  private xl: number;

  @Prop({ type: [Number, String], validator: sizeValidator })
  private col: number;

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
    ];
  }
}
</script>
