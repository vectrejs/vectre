import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const TileSubtitle = defineComponent({
  name: 'TileSubtitle',
  props: {
    compact: { type: Boolean },
  },
  render(): VNode {
    const cssClass = mergeCss(this.$attrs, 'tile-subtitle');

    return this.$props.compact ? (
      <small {...this.$attrs} class={cssClass}>
        {this.$slots.default && this.$slots.default()}
      </small>
    ) : (
      <p {...this.$attrs} class={cssClass}>
        {this.$slots.default && this.$slots.default()}
      </p>
    );
  },
});
