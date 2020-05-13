export enum States {
  active = 'active',
  disabled = 'disabled',
  loading = 'loading',
}

export type State = keyof typeof States;
