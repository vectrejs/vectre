export interface SlotDefinition {
  description?: string,
  scope?: string,
  required?: boolean,
}

export interface SlotDefinitions {
  [key: string]: SlotDefinition,
}

export type SlotsLists = { name: string, slots: SlotDefinitions }[]
