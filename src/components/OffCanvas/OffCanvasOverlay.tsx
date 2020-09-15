import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';
import { flattenListener } from '../../utils/listener';
import { OffCanvasOverlayEvents } from './Events';

export const OffCanvasOverlay = tsx.componentFactoryOf<OffCanvasOverlayEvents>().create({
  name: 'OffCanvasOverlay',
  functional: true,
  props: {
    opacity: { type: [Number, String], default: 0.1 },
  },
  render(h: CreateElement, { data, listeners, props }): VNode {
    const cssClass = mergeCss(data, 'off-canvas-overlay');
    const onClick = flattenListener(listeners.click);

    return <a {...data} class={cssClass} onClick={onClick} style={`background: rgba(48, 55, 66, ${props.opacity})`} />;
  },
});
