import { defineComponent, VNode } from 'vue';

export const Divider = defineComponent({
  name: 'Divider',
  props: {
    vert: { type: Boolean },
    content: { type: String, default: undefined },
  },

  render(): VNode {
    const slotedContent = this.$slots.default && this.$slots.default().find(({ children }) => children);
    const classes = ['text-center', this.$props.vert && 'divider-vert', !this.$props.vert && 'divider'];
    const dataContent = this.$props.content || (slotedContent && slotedContent.children);

    return <div class={classes} data-content={dataContent} />;
  },
});
