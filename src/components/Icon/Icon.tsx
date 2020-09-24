import * as tsx from 'vue-tsx-support';
import { IconSize, IconSizes } from './Size';
import { IconType, Icons } from './Type';
import { CreateElement, VNode } from 'vue';

interface IconProps {
  type: IconType;
}

export const Icon = tsx.component({
  name: 'Icon',
  functional: true,
  props: {
    name: { type: String as () => IconType, required: true },
    size: { type: String as () => IconSize, default: undefined },
  },
  render(h: CreateElement, { props, data }): VNode {
    const styles = { 'font-size': IconSizes[props.size] || props.size };
    const classes = ['icon', IconSizes[props.size as IconSize], Icons[props.name] || props.name];

    return <i class={classes} style={styles} {...data} />;
  },
});
