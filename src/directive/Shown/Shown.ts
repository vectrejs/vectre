import { DirectiveFunction } from 'vue';
import { Sizes } from './size';

export const Shown: DirectiveFunction = (el: HTMLElement, { value }): void => {
  if (value === undefined) return;

  let sizes: string[];
  if (!Array.isArray(value)) {
    sizes = [Sizes[value]];
  } else {
    sizes = value.map(v => Sizes[v]);
  }

  el.classList.add(...sizes);
};
