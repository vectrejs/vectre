import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const TileTitle = defineComponent({
  name: 'TileTitle',
  render(): VNode {
    const cssClass = mergeCss(this.$attrs, 'tile-title');

    return (
      <p {...this.$attrs} class={cssClass}>
        {this.$slots.default && this.$slots.default()}
      </p>
    );
  },
});
