import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const TileContent = tsx.component({
  name: 'TileContent',
  functional: true,
  render(h: CreateElement, { data, children }): VNode {
    const cssClass = mergeCss(data, 'tile-content');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
