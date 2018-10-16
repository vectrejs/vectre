import { EventDefinitions, EventsLists } from '@kitchen/component/Events';

export const events: EventsLists = [
  {
    name: 'Select',
    events: {
      input: {
        description: 'Fires after an option has been selected',
        payload: 'string, string[], number',
      },
    },
  },
];
