import { DirectiveFunction } from 'vue';

export const Badge: DirectiveFunction = /*#__PURE__*/ (el: HTMLElement, { value }): void => {
  if (value === undefined) return;

  el.classList.add('badge');
  el.setAttribute('data-badge', value);
};
