import { computed, defineComponent, VNode } from 'vue';

export const OffCanvasSidebar = defineComponent({
  name: 'OffCanvasSidebar',
  props: {
    active: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    const cssClass = computed(() => ['off-canvas-sidebar', props.active && 'active']);

    return (): VNode => {
      return (
        <div {...attrs} class={cssClass.value}>
          {slots.default && slots.default()}
        </div>
      );
    };
  },
});
