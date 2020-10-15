import { DirectiveFunction } from 'vue';
import { TooltipSides, TooltipSide } from './Side';

export const Tooltip: DirectiveFunction = /*#__PURE__*/ (el, { value, modifiers }) => {
  if (typeof value !== 'undefined') {
    el.classList.add('tooltip');
    el.setAttribute('data-tooltip', value);

    Object.keys(TooltipSides).map((side: string) => {
      if (modifiers[side]) el.classList.add(TooltipSides[side as TooltipSide]);
    });
  }
};
