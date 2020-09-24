export enum CardImagePositions {
  before = 'before',
  after = 'after',
}
export type CardImagePosition = keyof typeof CardImagePositions;

export enum CardImageSlots {
  header = 'header',
  body = 'body',
  footer = 'footer',
}
export type CardImageSlot = keyof typeof CardImageSlots;
