import { defineComponent, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const CardImage = defineComponent({
  name: 'CardImage',
  props: {
    img: { type: String, required: true },
  },
  setup(props, { attrs }) {
    const cssClass = mergeCss(attrs, 'card-image');

    return (): VNode => (
      <div {...attrs} class={cssClass}>
        <img src={props.img} class="img-responsive" />
      </div>
    );
  },
});
