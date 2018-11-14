export type State = keyof typeof States;

export enum States {
  active = 'active',
  disabled = 'disabled',
  loading = 'loading',
}
