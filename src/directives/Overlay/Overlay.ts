import { Directive } from 'vue';
import { OverlayBinding, OverlayConfiguration } from './type';
import './styles.scss';

const findOverlay = (el: HTMLElement): HTMLDivElement =>
  [].slice.call(el.children).find((n) => n.className === 'overlay__shadow');

const findRootElement = (el: HTMLElement): HTMLElement => {
  let parent = el.parentElement;

  while (parent.parentElement !== document.body) {
    parent = parent.parentElement;
  }

  return parent;
};

const onClickStub = (): void => {
  /* NOOP */
};

const normalizeBinding = ({ value, arg, modifiers }: OverlayBinding): OverlayConfiguration => {
  const configuration: OverlayConfiguration = {};

  if (typeof value === 'object') {
    configuration.opacity = String(value.opacity || 75).padStart(2, '0');
    configuration.zIndex = value.zIndex || 1;
    configuration.text = value.text || '';
    configuration.blur = value.blur || modifiers.blur;
    configuration.onClick = value.onClick || onClickStub;
    configuration.fullscreen = value.fullscreen || modifiers.fullscreen;
    configuration.noScroll = configuration.fullscreen && (value.noScroll || modifiers.noScroll);
    configuration.show = value.show;
  } else {
    configuration.opacity = String(arg || 75).padStart(2, '0');
    configuration.zIndex = 1;
    configuration.text = typeof value === 'string' ? value : '';
    configuration.blur = modifiers.blur;
    configuration.onClick = typeof value === 'function' ? value : onClickStub;
    configuration.fullscreen = modifiers.fullscreen;
    configuration.noScroll = configuration.fullscreen && modifiers.noScroll;
    configuration.show = !!value;
  }

  return configuration;
};

const updateOverlay = (overlayEl: HTMLElement, configuration: OverlayConfiguration): void => {
  overlayEl.style.setProperty('z-index', String(configuration.zIndex));
  overlayEl.style.setProperty('background', `rgba(247, 248, 249, 0.${configuration.opacity})`);

  if (blur) {
    const blurLevel = configuration.blur === true ? '2px' : `${configuration.blur}px`;
    overlayEl.style.setProperty('backdrop-filter', `blur(${blurLevel})`);
  }

  if (configuration.text) {
    overlayEl.innerHTML = configuration.text;
  }
};

const createOverlay = (container: HTMLElement, configuration: OverlayConfiguration): HTMLDivElement => {
  const overlayEl = document.createElement('div');
  overlayEl.className = 'overlay__shadow';

  if (configuration.fullscreen) {
    overlayEl.style.setProperty('position', 'fixed');
  }

  overlayEl.addEventListener('click', configuration.onClick);
  container.insertBefore(overlayEl, container.firstChild);

  return overlayEl;
};

const disableScroll = (container: HTMLElement): void => {
  const root = findRootElement(container);
  root.style.setProperty('top', `-${window.scrollY}px`);
  root.style.setProperty('position', 'fixed');
};

const enableScroll = (container: HTMLElement): void => {
  const root = findRootElement(container);
  root.style.position = '';
  const top = root.style.top.match(/\d+/) || [];
  window.scrollTo({ top: +top[0] || 0 });
};

export const overlay: Directive = {
  mounted: /*#__PURE__*/ (el: HTMLElement, binding: OverlayBinding): void => {
    const configuration = normalizeBinding(binding);
    let overlayEl = findOverlay(el);

    if (configuration.show && !overlayEl) {
      overlayEl = createOverlay(el, configuration);
      updateOverlay(overlayEl, configuration);

      if (configuration.noScroll) {
        disableScroll(el);
      }
    }
  },
  updated: /*#__PURE__*/ (el, binding: OverlayBinding) => {
    let overlayEl = findOverlay(el);
    const configuration = normalizeBinding(binding);
    const oldValue = typeof binding.oldValue === 'object' ? binding.oldValue.show : !!binding.oldValue;

    if (configuration.show) {
      if (!overlayEl) {
        overlayEl = createOverlay(el, configuration);
      }

      if (configuration.noScroll) {
        disableScroll(el);
      }

      updateOverlay(overlayEl, configuration);
    } else if (oldValue !== configuration.show) {
      if (configuration.noScroll) {
        enableScroll(el);
      }
      if (overlayEl) {
        el.removeChild(overlayEl);
      }
    }
  },
};
