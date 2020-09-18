import { VNode, CreateElement } from 'vue';
import * as tsx from 'vue-tsx-support';
import { mergeCss } from '../../utils/css';
import { Step } from './Step';

export const Steps = /*#__PURE__*/ tsx.component({
  name: 'Steps',
  functional: true,
  props: {
    items: { type: [Array, Object], default: (): Record<string, any>[] => [] },
    active: {
      type: [Number, String],
      default: 1,
    },
  },
  render(h: CreateElement, { data, props, children = [] }): VNode {
    const cssClass = mergeCss(data, 'step');

    const items = Array.isArray(props.items) ? { ...props.items } : props.items;
    const steps = Object.keys(items).map(
      (key, index): VNode => {
        const active = String(index) === key ? props.active == index + 1 : props.active == key;

        return (
          <Step tooltip={items[key].tooltip} active={active}>
            {items[key].name}
          </Step>
        );
      },
    );

    children.forEach(
      (child: VNode, i: number): void => {
        if (i + 1 == props.active) {
          child.data.class.push('active');
        }
      },
    );

    return (
      <div {...data} class={cssClass}>
        {(steps.length && steps) || children}
      </div>
    );
  },
});
