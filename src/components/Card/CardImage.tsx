import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const CardImage = tsx.component({
  name: 'CardImage',
  functional: true,
  props: {
    img: { type: String, required: true },
  },
  render(h: CreateElement, { props }): VNode {
    return (
      <div staticClass="card-image">
        <img src={props.img} staticClass="img-responsive" />
      </div>
    );
  },
});
