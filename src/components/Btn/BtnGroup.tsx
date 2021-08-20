import { mergeCss } from '../../utils/css';
import { defineComponent, VNode } from 'vue';

export const BtnGroup = defineComponent({
  name: 'BtnGroup',

  props: {
    block: { type: Boolean },
  },
  render(): VNode {
    const cssClass: string[] = mergeCss(this.$attrs, 'btn-group', [this.$props.block && 'btn-group-block']);

    return (
      <div {...this.$attrs} class={cssClass}>
        {this.$slots.default && this.$slots.default()}
      </div>
    );
  },
});
