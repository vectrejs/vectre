import { CreateElement, VNode } from 'vue';
import * as tsx from 'vue-tsx-support';
import { mergeCss } from '../../utils/css';
import { PopoverSides, PopoverSide } from './Side';

export const Popover = /*#__PURE__*/ tsx.component({
  name: 'Popover',
  functional: true,
  props: {
    side: {
      type: String as () => PopoverSide,
      default: undefined,
      validator: (side: PopoverSide): boolean => Object.keys(PopoverSides).includes(side),
    },
  },
  render(h: CreateElement, { data, props, children = [] }): VNode {
    const cssClass = mergeCss(data, 'popover', [PopoverSides[props.side]]);
    const activator = children.shift();

    return (
      <div class={cssClass}>
        {activator}
        <div staticClass="popover-container">{children}</div>
      </div>
    );
  },
});
