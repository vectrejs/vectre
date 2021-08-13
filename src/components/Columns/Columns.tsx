import { defineComponent, VNode } from 'vue';

export const Columns = defineComponent({
  name: 'Columns',
  props: {
    gapless: Boolean,
    oneline: Boolean,
  },
  setup(props, { slots, attrs }) {
    const cssClasses = ['columns', props.gapless && 'col-gapless', props.oneline && 'col-oneline'];

    return (): VNode => (
      <div class={cssClasses} {...attrs}>
        {slots && slots.default()}
      </div>
    );
  },
});
