export enum ToastTypes {
  primary = 'toast-primary',
  success = 'toast-success',
  warning = 'toast-warning',
  error = 'toast-error',
}

export type ToastType = keyof typeof ToastTypes;
