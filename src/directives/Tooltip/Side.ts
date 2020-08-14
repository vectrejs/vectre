export enum TooltipSides {
  top = '',
  bottom = 'tooltip-bottom',
  right = 'tooltip-right',
  left = 'tooltip-left',
}

export type TooltipSide = keyof typeof TooltipSides;
