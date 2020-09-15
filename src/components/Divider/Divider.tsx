import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';

export const Divider = tsx.component({
  name: 'Divider',
  functional: true,
  props: {
    vert: { type: Boolean },
    content: { type: String, default: undefined },
  },

  render(h: CreateElement, { props, slots, data }): VNode {
    const classes = ['text-center', props.vert && 'divider-vert', !props.vert && 'divider'];
    const dataContent = props.content || (slots().default && slots().default[0].text);

    return <div class={classes} data-content={dataContent} {...data} />;
  },
});
