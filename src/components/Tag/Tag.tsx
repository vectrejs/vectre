import * as tsx from 'vue-tsx-support';
import { TagType, TagTypes } from './Type';
import './styles.scss';

export const Tag = tsx.component({
  name: 'Tag',
  functional: true,
  props: {
    type: { type: String as () => TagType, default: undefined },
    rounded: { type: Boolean },
  },
  render(h, { slots, props, data }) {
    const classes = ['label', TagTypes[props.type], props.rounded && 'label-rounded'];

    return (
      <span class={classes} {...data}>
        {slots().default}
      </span>
    );
  },
});
