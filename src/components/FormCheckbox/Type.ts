export enum FormCheckboxTypes {
  switch = 'form-switch',
  checkbox = 'form-checkbox',
}

export type FormCheckboxType = keyof typeof FormCheckboxTypes;
