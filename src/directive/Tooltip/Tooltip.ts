import { DirectiveFunction } from 'vue';
import { Side } from './Side';

export const Tooltip: DirectiveFunction = (el, { value, modifiers }) => {
  if (value) {
    el.classList.add('tooltip');
    el.setAttribute('data-tooltip', value);

    Object.keys(Side).map((side: string) => {
      if (modifiers[side]) el.classList.add(Side[side as any]);
    });
  }
};
