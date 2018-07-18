export interface PropDefinition {
  description?: string,
  default?: string | number | boolean,
  accepted?: string,
  type: string,
  required?: boolean
}

export interface PropDefinitions {
  [key: string]: PropDefinition,
}