import { DirectiveFunction } from 'vue';

export const Badge: DirectiveFunction = (el: HTMLElement, { value }): void => {
  if (value === undefined) return;

  el.classList.add('badge');
  el.setAttribute('data-badge', value);
};
