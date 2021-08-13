import { TagType, TagTypes } from './Type';
import './styles.scss';
import { defineComponent, PropType } from 'vue';

export const Tag = /*#__PURE__*/ defineComponent({
  name: 'Tag',
  props: {
    type: { type: String as PropType<TagType>, default: undefined },
    rounded: { type: Boolean },
  },
  render() {
    const classes = ['label', TagTypes[this.$props.type], this.$props.rounded && 'label-rounded'];

    return (
      <span class={classes} {...this.$attrs}>
        {this.$slots.default && this.$slots.default()}
      </span>
    );
  },
});
