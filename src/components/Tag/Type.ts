export enum TagTypes {
  primary = 'label-primary',
  secondary = 'label-secondary',
  success = 'label-success',
  warning = 'label-warning',
  error = 'label-error',
}

export type TagType = keyof typeof TagTypes;
