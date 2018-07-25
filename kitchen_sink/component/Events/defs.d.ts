export interface EventDefinition {
  description?: string,
  payload?: string,
}

export interface EventDefinitions {
  [key: string]: EventDefinition,
}