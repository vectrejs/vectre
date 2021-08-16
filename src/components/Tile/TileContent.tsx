import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const TileContent = defineComponent({
  name: 'TileContent',
  render(): VNode {
    const cssClass = mergeCss(this.$attrs, 'tile-content');

    return (
      <div {...this.$attrs} class={cssClass}>
        {this.$slots.default && this.$slots.default()}
      </div>
    );
  },
});
