<template>
  <div class="accordion-container">
    <div class="accordion" v-for="(value, key, index) of items" :key="index || key || 0">
      <input 
        :id="uid(index || key || 0)" 
        :name="id"
        :type="type" 
        :checked="isSelected(key, index)" 
        @click="check($event, key, index)"
        hidden 
      />
      
      <label class="accordion-header c-hand" :for="uid(index || key || 0)">
        <icon v-if="icon" :type="icon" />
        <slot v-if="$scopedSlots['header']" name="header" :item="value" :index="key || index || 0"></slot>
        <template v-else>{{ key }}</template>
      </label>
      
      <div class="accordion-body">
        <slot v-if="$scopedSlots['body']" name="body" :item="value" :index="key || index || 0"></slot>
        <slot v-if="!$scopedSlots['body']" :item="value"  :index="key || index || 0"></slot>
        <span v-if="!$scopedSlots['body'] && !$slots.default" v-html="value" />
      </div>
    </div>  
  </div>
</template>

<script lang="ts">
import vue, { CreateElement } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Icon, IconType } from './Icon';

@Component({
  components: {
    Icon,
  },
})
export default class extends vue {
  @Prop({ required: true, type: [Object, Array] })
  public items: object[] | object;

  @Prop([String, Number, Array])
  public checked: string | number | string[] | number[];

  @Prop([String])
  public name: string;

  @Prop([Boolean])
  public multiple: boolean;

  @Prop([String])
  public icon: IconType;

  public get type(): string {
    return this.multiple ? 'checkbox' : 'radio';
  }

  private uid(index: number): string {
    return this.id + '-' + index;
  }

  private isSelected(key: string, index: number): boolean {
    if (!Array.isArray(this.checked)) {
      return !!this.checked
        && (this.checked === key || this.checked.toString() === index.toString());
    }

    if ((this.checked as number[]).indexOf(index) !== -1) {
      return true;
    }

    if ((this.checked as string[]).indexOf(key) !== -1) {
      return true;
    }

    return false;
  }

  private check(event: Event, key: string, index: number) {
    if (!this.$listeners.check) return;

    event.preventDefault();

    if (!this.multiple) {
      return this.$emit('check', key || index || 0);
    }

    let checked = Array.isArray(this.checked)
      ? [...this.checked]
      : this.checked !== undefined
        ? [this.checked]
        : [];

    if ((event.target as HTMLInputElement).checked) {
      checked.push(key || index || 0);
    } else {
      checked = checked.filter(item => item !== index && item !== key);
    }

    this.$emit('check', checked);
  }

  private get id(): string {
    return this.name
      ? this.name
      : 'accordion-' + Math.round(Math.random() * 1000);
  }
}
</script>
