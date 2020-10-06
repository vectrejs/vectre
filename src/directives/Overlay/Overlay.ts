import { DirectiveFunction } from 'vue';

const findOverlay = (el: HTMLElement): HTMLDivElement =>
  [].slice.call(el.children).find((n) => n.className === 'c-overlay');

export const Overlay: DirectiveFunction = (el, { value, oldValue, arg }) => {
  if (value === oldValue) return;

  if (value) {
    const overlayEl = document.createElement('div');
    const height = el.scrollHeight ? el.scrollHeight + 'px' : '100%';

    const opacity = String(arg || 75).padStart(2, '0');

    if (!findOverlay(el)) {
      overlayEl.className = 'c-overlay';
      overlayEl.style.cssText = `
        z-index: 1;
        position: absolute;
        width: 100%;
        height: ${height};
        background: rgba(247, 248, 249, 0.${opacity});
      `;

      el.insertBefore(overlayEl, el.firstChild);

      if (typeof value === 'function') {
        overlayEl.addEventListener('click', value);
      }
    }
  } else {
    const overlayEl = findOverlay(el);
    if (overlayEl) {
      el.removeChild(overlayEl);
    }
  }
};
