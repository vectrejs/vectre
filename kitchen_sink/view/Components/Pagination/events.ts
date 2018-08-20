import { EventDefinitions } from '@kitchen/component/Events';

export const events: EventDefinitions = {
  'update:current': {
    description: 'Thrown when the current page changes',
    payload: '[current_page]',
  },
};
