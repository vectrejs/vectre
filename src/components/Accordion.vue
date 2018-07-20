<template>
  <div class="accordion-container">
    <div class="accordion" v-for="(value, key, index) of items" :key="index || key">
      
      <input :type="type" hidden :id="uid(index || key)" :name="id" :checked="isSelected(key, index, value)">
      
      <label class="accordion-header c-hand" :for="uid(index || key)">
        <icon v-if="icon" :type="icon" />
        <slot v-if="$scopedSlots['header']" name="header" :item="{value, key, index}"></slot>
        <template v-else>{{ key }}</template>
      </label>
      
      <div class="accordion-body">
        <slot v-if="$scopedSlots['body']" name="body" :item="{value, key, index}"></slot>
        <slot v-if="!$scopedSlots['body']" :item="{value, key, index}"></slot>
        <template v-if="!$scopedSlots['body'] && !$slots.default">{{ value }}</template>
      </div>
    </div>  
  </div>
</template>

<script lang="ts">
import vue, { CreateElement } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Icon, { Type as IconType } from './Icon';

@Component({
  components: {
    Icon
  }
})
export default class extends vue {
  @Prop({ required: true, type: [Object, Array] })
  private items: object[] | object;

  @Prop([String, Number, Array])
  private checked: string | number | string[] | number[];

  @Prop([String])
  private name: string;

  @Prop([Boolean])
  private multiple: boolean;

  @Prop([String])
  private icon: IconType;

  private get type(): string {
    return this.multiple ? 'checkbox' : 'radio';
  }

  private uid(index: number): string {
    return this.id + '-' + index;
  }

  private isSelected(key: string, index: number, value: any): boolean {
    if (Array.isArray(this.checked) === false) {
      return !!this.checked && (this.checked == key || this.checked == index || this.checked == value);  
    }

    if ((<number[]>this.checked).indexOf(index) !== -1) {
      return true;
    }
    if ((<string[]>this.checked).indexOf(key) !== -1) {
      return true;
    };

    return (<any[]>this.checked).indexOf(value) !== -1;
  }

  private get id(): string {
    return this.name ? this.name : 'accordion-' + Math.round(Math.random() * 1000)
  }
}
</script>
