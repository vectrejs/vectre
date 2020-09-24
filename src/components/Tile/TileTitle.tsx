import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const TileTitle = tsx.component({
  name: 'TileTitle',
  functional: true,
  render(h: CreateElement, { data, children }): VNode {
    const cssClass = mergeCss(data, 'tile-title');

    return (
      <p {...data} class={cssClass}>
        {children}
      </p>
    );
  },
});
