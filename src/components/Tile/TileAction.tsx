import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const TileAction = tsx.component({
  name: 'TileAction',
  functional: true,
  render(h: CreateElement, { data, children }): VNode {
    const cssClass = mergeCss(data, 'tile-action');

    return (
      <div {...data} class={cssClass}>
        {children}
      </div>
    );
  },
});
