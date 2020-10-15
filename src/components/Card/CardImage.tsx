import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { mergeCss } from '../../utils/css';

export const CardImage = tsx.component({
  name: 'CardImage',
  functional: true,
  props: {
    img: { type: String, required: true },
  },
  render(h: CreateElement, { props, data }): VNode {
    const cssClass = mergeCss(data, 'card-image');

    return (
      <div {...data} class={cssClass}>
        <img src={props.img} staticClass="img-responsive" />
      </div>
    );
  },
});
