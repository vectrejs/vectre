import { VNodeDirective } from 'vue';

export interface OverlayConfiguration {
  onClick?: OverlayOnClickHandler;
  zIndex?: string | number;
  opacity?: string | number;
  text?: string;
  show?: boolean;
  blur?: boolean | string | number;
  noScroll?: boolean;
  fullscreen?: boolean;
}

export type OverlayOnClickHandler = (event: MouseEvent) => void;

export type OverlayValue = string | OverlayOnClickHandler | OverlayConfiguration;

export interface OverlayBinding extends VNodeDirective {
  value?: OverlayValue;
  oldValue?: OverlayValue;
}
