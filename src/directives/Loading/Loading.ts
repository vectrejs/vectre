import { Directive } from 'vue';

const add = (el: HTMLElement, cssClasses: string[]): void => {
  el.classList.add(...cssClasses);
};

const remove = (el: HTMLElement, cssClasses: string[]): void => {
  el.classList.remove(...cssClasses);
};

export const Loading: Directive = /*#__PURE__*/ (el: HTMLElement, { value = true, modifiers }): void => {
  const cssClasses = ['loading'];

  if (modifiers.lg) {
    cssClasses.push('loading-lg');
  }

  if (value instanceof Promise) {
    add(el, cssClasses);
    value.then(() => remove(el, cssClasses));

    return;
  }

  if (value === undefined || !!value) {
    add(el, cssClasses);

    return;
  }

  remove(el, cssClasses);
};
