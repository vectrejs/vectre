import { defineComponent, VNode } from 'vue';
import { flattenListener } from '../../utils/listener';
import { SimplePager } from './SimplePager';
import { Pager } from './Pager';
import './styles.scss';

export const Pagination = defineComponent({
  name: 'Pagination',

  model: {
    prop: 'current',
    event: 'change',
  },
  props: {
    pages: { type: [Number, Array] as (() => number | string[])[], required: true },
    modelValue: { type: [Number, String], default: undefined },
    show: { type: Number, default: undefined },
    onChange: { type: Function, default: undefined },
  },
  emits: ['change', 'update:modelValue'],
  render(): VNode {
    const change = flattenListener([
      this.$props.onChange,
      (current: number | string): void => this.$emit('update:modelValue', current),
    ]);

    if (Array.isArray(this.$props.pages)) {
      return <SimplePager pages={this.$props.pages} current={String(this.$props.modelValue)} onChange={change} />;
    }

    return <Pager pages={this.$props.pages} current={Number(this.$props.modelValue)} onChange={change} />;
  },
});
