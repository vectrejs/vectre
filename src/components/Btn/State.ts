export enum BtnStates {
  active = 'active',
  disabled = 'disabled',
  loading = 'loading',
}

export type BtnState = keyof typeof BtnStates;
