import { Directive } from 'vue';

const listeners = new WeakMap();

const getEvent = (touch = false): 'touchstart' | 'click' => {
  if (!touch) return 'click';

  return 'ontouchstart' in window || navigator.msMaxTouchPoints ? 'touchstart' : 'click';
};

const getListener = (
  el: HTMLElement,
  callback?: (e: Event, el: HTMLElement) => void,
): ((e: TouchEvent | MouseEvent) => void) => {
  if (!listeners.has(el)) {
    listeners.set(el, (e: TouchEvent | MouseEvent): void => {
      if (!el.contains(e.target as Node)) {
        callback(e, el);
      }
    });
  }

  return listeners.get(el);
};

export const ClickOutside: Directive = /*#__PURE__*/ {
  beforeMount(el, { value, modifiers }) {
    document.addEventListener(getEvent(modifiers.touch), getListener(el, value));
  },
  unmounted(el) {
    document.removeEventListener(getEvent(), getListener(el));
  },
};
