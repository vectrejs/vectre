import vue, { CreateElement, VNode } from 'vue';
import { All as IconAll, IconSize } from '@components/Icon';
import { Size } from './Size';

enum IconSide {
  left = 'has-icon-left',
  right = 'has-icon-right',
}

const createIcon = (h: CreateElement, icon: string): VNode => {
  return h('i', { class: ['form-icon', 'icon', IconAll[icon as any]] });
};

const createLoading = (h: CreateElement): VNode => {
  return h('i', { class: ['form-icon', 'loading'] });
};

// tslint:disable-next-line:max-line-length
const wrapWithIconContainer = (h: CreateElement, input: VNode, side = 'right'): VNode => {
  return h('div', { class: [IconSide[side as any]] }, [input]);
};

const createInput = (h: CreateElement, domProps: Record<string, string>, size = ''): VNode => {
  return h('input', { domProps, class: ['form-input', Size[size as any]] });
};

export const Input = vue.extend({
  props: {
    icon: {
      type: String,
    },
    iconSide: {
      type: String,
      validator: (side: string) => Object.keys(IconSide).includes(side),
    },
    loading: {
      type: Boolean,
    },
    size: {
      type: String,
      validator: (size: string) => Object.keys(Size).includes(size),
    },
  },

  render(h) {
    const { icon, iconSide, loading, size } = this.$props;
    let input = createInput(h, this.$attrs, size);

    if (icon || loading) {
      input = wrapWithIconContainer(h, input, iconSide);
      if (loading) {
        input.children!.push(createLoading(h));
      } else {
        input.children!.push(createIcon(h, icon));
      }
    }

    return input;
  },
});
