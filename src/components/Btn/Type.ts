export enum BtnTypes {
  primary = 'btn-primary',
  link = 'btn-link',
  success = 'btn-success',
  error = 'btn-error',
  clear = 'btn-clear',
}

export type BtnType = keyof typeof BtnTypes;
