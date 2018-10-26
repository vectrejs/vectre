import { DirectiveFunction } from 'vue';
import { Colors, Color } from './Colors';

export const Background: DirectiveFunction = (el: HTMLElement, { value, modifiers }): void => {
  // if (value === undefined) return;

console.log(modifiers);

  el.classList.add(Colors[value as Color]);
};
