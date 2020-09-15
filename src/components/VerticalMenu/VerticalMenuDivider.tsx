import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

const normalizeDivider = (divider: string | boolean): string => {
  return typeof divider === 'string' ? divider : '';
};

export const VerticalMenuDivider = tsx.component({
  name: 'VerticalMenuDivider',
  functional: true,
  props: {
    text: { type: [String, Boolean], default: undefined },
  },
  render(h: CreateElement, { props }): VNode {
    return <li staticClass="divider" data-content={normalizeDivider(props.text)} />;
  },
});
