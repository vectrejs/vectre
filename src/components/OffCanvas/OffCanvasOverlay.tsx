import { defineComponent, PropType, VNode } from 'vue';
import { mergeCss } from '../../utils/css';
import { flattenListener } from '../../utils/listener';

export const OffCanvasOverlay = defineComponent({
  name: 'OffCanvasOverlay',
  props: {
    opacity: { type: [Number, String], default: 0.1 },
    onClick: { default: undefined, type: Function as PropType<(event: MouseEvent) => void> },
  },
  emits: {
    click: null,
  },
  setup(props, { attrs }) {
    const cssClass = mergeCss(attrs, 'off-canvas-overlay');
    const onClick = flattenListener(props.onClick);

    return (): VNode => (
      <a {...attrs} onClick={onClick} class={cssClass} style={`background: rgba(48, 55, 66, ${props.opacity})`} />
    );
  },
});
