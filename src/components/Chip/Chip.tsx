import { defineComponent, VNode } from 'vue';
import { Avatar } from '../Avatar';
import { flattenListener } from '../../utils/listener';

export const Chip = defineComponent({
  name: 'Chip',
  functional: true,
  props: {
    active: { type: Boolean },
    text: { type: String, required: true },
    avatar: { type: String, default: undefined },
    initials: { type: String, default: undefined },
    small: { type: Boolean },
    onClose: { type: Function, default: undefined },
  },
  emits: ['close'],
  render(): VNode {
    const cssClass = ['chip', this.$props.active && 'active'];

    const avatar = (this.$props.avatar || this.$props.initials) && (
      <Avatar src={this.$props.avatar} size={this.$props.small ? 'sm' : undefined} initials={this.$props.initials} />
    );
    const closeBtn = this.onClose && (
      <a class="btn btn-clear" aria-label="Close" role="button" onClick={flattenListener(this.onClose)} />
    );

    return (
      <span class={cssClass}>
        {avatar}
        {this.$props.text}
        {closeBtn}
      </span>
    );
  },
});
