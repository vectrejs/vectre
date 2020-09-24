import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const TileSubtitle = tsx.component({
  name: 'TileSubtitle',
  functional: true,
  props: {
    compact: { type: Boolean },
  },
  render(h: CreateElement, { data, children, props }): VNode {
    const cssClass = mergeCss(data, 'tile-subtitle');

    return props.compact ? (
      <small {...data} class={cssClass}>
        {children}
      </small>
    ) : (
      <p {...data} class={cssClass}>
        {children}
      </p>
    );
  },
});
