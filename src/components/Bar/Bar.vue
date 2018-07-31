<template>
    <div class="bar" :class="barCssClass">
      <div 
        class="bar-item" 
        :class="barItemCssClass" 
        :style="cssStyle" 
        :data-tooltip="dataTooltip" 
        :aria-valuenow="value" 
        :aria-valuemin="min" 
        :aria-valuemax="max"
        role="progressbar" 
      />
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop(Boolean) private sm: boolean;

  @Prop({ type: Number, default: 0 })
  private min: number;

  @Prop({ type: Number, default: 100 })
  private max: number;

  @Prop({ type: Number, default: 0 })
  private value: number;

  @Prop([Function, String])
  private tooltip: ((value: number) => string) | string | undefined;

  get dataTooltip(): string | undefined {
    if (typeof this.tooltip === "undefined") {
      return;
    }

    if (typeof this.tooltip === "function") {
      return this.tooltip(this.value);
    }

    return this.value.toString() + this.tooltip;
  }

  get barCssClass(): string[] {
    return [this.sm ? "bar-sm" : ""];
  }

  get barItemCssClass(): string[] {
    return [this.tooltip ? "tooltip" : ""];
  }

  get cssStyle(): object {
    return {
      width: this.value / this.max * 100 + "%"
    };
  }
}
</script>
