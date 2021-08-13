import { defineComponent, VNode } from 'vue';

const normalizeDivider = (divider: string | boolean): string => {
  return typeof divider === 'string' ? divider : '';
};

export const VerticalMenuDivider = defineComponent({
  name: 'VerticalMenuDivider',
  props: {
    text: { type: [String, Boolean], default: undefined },
  },
  setup(props) {
    return (): VNode => <li class="divider" data-content={normalizeDivider(props.text)} />;
  },
});
