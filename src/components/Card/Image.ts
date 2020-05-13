export enum Positions {
  before = 'before',
  after = 'after',
}
export type Position = keyof typeof Positions;

export enum Slots {
  header = 'header',
  body = 'body',
  footer = 'footer',
}
export type Slot = keyof typeof Slots;
