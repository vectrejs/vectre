export enum Sides {
  top = '',
  bottom = 'tooltip-bottom',
  right = 'tooltip-right',
  left = 'tooltip-left',
}

export type Side = keyof typeof Sides;
