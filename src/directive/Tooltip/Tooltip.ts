import { DirectiveFunction } from 'vue';
import { Sides, Side } from './Side';

export const Tooltip: DirectiveFunction = (el, { value, modifiers }) => {
  if (value) {
    el.classList.add('tooltip');
    el.setAttribute('data-tooltip', value);

    Object.keys(Sides).map((side: string) => {
      if (modifiers[side]) el.classList.add(Sides[side as Side]);
    });
  }
};
