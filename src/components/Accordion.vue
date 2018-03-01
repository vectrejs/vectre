<template>
  <div class="accordion-container">
    <div class="accordion" v-for="(value, key, index) of items" :key="index">
      
      <input :type="type" hidden :id="uid(index)" :name="id" :checked="isSelected(key, index)">
      
      <label class="accordion-header c-hand" :for="uid(index)">
        <slot name="header" :item="{value, key, index}"></slot>
      </label>
      
      <div class="accordion-body">
        <slot name="body" :item="{value, key, index}"></slot>
      </div>

    </div>  
  </div>
</template>

<script lang="ts">
import vue, { CreateElement } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { VNode } from 'vue/types/vnode';

@Component
export default class extends vue {
  @Prop({ required: true, type: [Object, Array] })
  private items: object[] | object;

  @Prop([String, Number, Array])
  private checked: string | number | string[] | number[];

  @Prop([String])
  private name: string;

  @Prop([Boolean])
  private multiple: boolean;

  private _id: string;

  public get type(): string {
    return this.multiple ? 'checkbox' : 'radio';
  }

  public uid(index: number): string {
    return this.id + '-' + index;
  }

  public isSelected(key: string, index: number): boolean {
    if (Array.isArray(this.checked) === false) {
      return !!this.checked && (this.checked == key || this.checked == index);  
    }

    if ((<number[]>this.checked).indexOf(index) !== -1) {
      return true;
    }
    return (<string[]>this.checked).indexOf(key) !== -1;
  }

  public get id(): string {
    return this.name ? this.name : 'accordion-' + Math.round(Math.random() * 1000)
  }
}
</script>
