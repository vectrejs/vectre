<template>
  <div class="accordion">
    <input type="checkbox" hidden :id="'accordion-' + index" name="accordion-checkbox" :checked="isSelected()">
    <label class="accordion-header c-hand" :for="'accordion-' + index">
      <slot name="header"></slot>
    </label>
    <div class="accordion-body">
      <slot name="body"></slot>
    </div>
  </div>  
</template>

<script lang="ts">
import vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class extends vue {
  @Prop()
  private checked: number;

  @Prop()
  private index: number;

  public isSelected(): boolean {

    return this.checked === this.index
  }
}
</script>
