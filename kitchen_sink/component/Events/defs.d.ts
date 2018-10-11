export interface EventDefinition {
  description?: string,
  payload?: string,
}

export interface EventDefinitions {
  [key: string]: EventDefinition,
}
export type EventsLists = { name: string, events: EventDefinitions}[];
