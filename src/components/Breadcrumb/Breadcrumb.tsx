import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { Crumb } from './Crumb';

export const Breadcrumb = tsx.component({
  name: 'Breadcrumb',
  functional: true,
  props: {
    crumbs: { type: Array as () => Crumb[], required: true },
  },
  render(h: CreateElement, { props, scopedSlots }): VNode {
    const crumbs = props.crumbs.map(crumb => {
      const slot = scopedSlots.default && scopedSlots.default({ crumb });
      const text = <a href={crumb.path}>{crumb.title}</a>;

      return <li staticClass="breadcrumb-item">{slot || text}</li>;
    });

    return <ul staticClass="breadcrumb">{crumbs}</ul>;
  },
});
