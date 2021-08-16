import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const TileAction = defineComponent({
  name: 'TileAction',
  render(): VNode {
    const cssClass = mergeCss(this.$attrs, 'tile-action');

    return (
      <div {...this.$attrs} class={cssClass}>
        {this.$slots.default && this.$slots.default()}
      </div>
    );
  },
});
