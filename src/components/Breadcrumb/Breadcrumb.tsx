import { defineComponent, PropType, VNode } from 'vue';
import { Crumb } from './Crumb';

export const Breadcrumb = defineComponent({
  name: 'Breadcrumb',
  functional: true,
  props: {
    crumbs: { type: Array as PropType<Crumb[] | any[]>, required: true },
  },
  render(): VNode {
    const crumbs = this.$props.crumbs.map((crumb) => {
      const slot = this.$slots.default && this.$slots.default({ crumb });

      return <li class="breadcrumb-item">{slot || <a href={crumb.path}>{crumb.title}</a>}</li>;
    });

    return <ul class="breadcrumb">{crumbs}</ul>;
  },
});
