export enum Sides {
  right = 'popover-right',
  left = 'popover-left',
  bottom = 'popover-bottom',
  top = '',
}

export type Side = keyof typeof Sides;
