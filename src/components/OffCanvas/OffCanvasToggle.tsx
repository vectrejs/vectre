import { hasSlot } from '../../utils/component';
import { computed, defineComponent, PropType, VNode } from 'vue';
import { mergeCss } from '../../utils/css';
import { flattenListener } from '../../utils/listener';
import { IconType, Icon } from '../Icon';

export const OffCanvasToggle = defineComponent({
  name: 'OffCanvasToggle',
  props: {
    icon: { type: String as PropType<IconType>, default: 'menu' },
    onClick: { type: Function as PropType<(event: MouseEvent) => void>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const cssClass = mergeCss(attrs, 'off-canvas-toggle');
    const onClick = flattenListener(props.onClick);
    const hasDefaultSlot = computed(() => hasSlot(slots, 'default'));

    return (): VNode => {
      return (
        <div {...attrs} class={cssClass}>
          <a class="btn btn-primary btn-action" onClick={onClick}>
            {(hasDefaultSlot.value && slots.default()) || <Icon name={props.icon} />}
          </a>
        </div>
      );
    };
  },
});
