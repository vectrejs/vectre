import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const Step = tsx.component({
  name: 'Step',
  functional: true,
  props: {
    active: { type: Boolean },
    tooltip: { type: String, default: undefined },
  },
  render(h: CreateElement, { data, props, children }): VNode {
    const cssClass = mergeCss(data, '', ['step-item', props.active && 'active', props.tooltip && 'tooltip']);

    return (
      <span {...data} class={cssClass} data-tooltip={props.tooltip}>
        <a>{children}</a>
      </span>
    );
  },
});
