export interface BtnEvents extends GlobalEventHandlers {
  onBlur: (event: Event) => void;
  onFocus: (event: Event) => void;
  onClick: (event: Event) => void;
}
