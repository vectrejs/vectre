import { DirectiveFunction } from 'vue';
import { TooltipSides, TooltipSide } from './Side';

export const Tooltip: DirectiveFunction = (el, { value, modifiers }) => {
  if (value) {
    el.classList.add('tooltip');
    el.setAttribute('data-tooltip', value);

    Object.keys(TooltipSides).map((side: string) => {
      if (modifiers[side]) el.classList.add(TooltipSides[side as TooltipSide]);
    });
  }
};
