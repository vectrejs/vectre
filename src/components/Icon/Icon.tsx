import { IconSize, IconSizes } from './Size';
import { IconType, Icons } from './Type';
import { defineComponent, PropType, VNode } from 'vue';

interface IconProps {
  type: IconType;
}

export const Icon = defineComponent({
  name: 'Icon',
  props: {
    name: { type: String as PropType<IconType>, required: true },
    size: { type: String as PropType<IconSize>, default: undefined },
  },
  setup(props, { attrs }) {
    const styles = { fontSize: IconSizes[props.size] || props.size };
    const classes = ['icon', IconSizes[props.size as IconSize], Icons[props.name] || props.name];

    return (): VNode => <i {...attrs} class={classes} style={styles} />;
  },
});
