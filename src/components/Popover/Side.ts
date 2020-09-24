export enum PopoverSides {
  right = 'popover-right',
  left = 'popover-left',
  bottom = 'popover-bottom',
  top = '',
}

export type PopoverSide = keyof typeof PopoverSides;
