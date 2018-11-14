export type Position = keyof typeof Positions;
export enum Positions {
  before = 'before',
  after = 'after',
}

export type Slot = keyof typeof Slots;
export enum Slots {
  header = 'header',
  body = 'body',
  footer = 'footer',
}
