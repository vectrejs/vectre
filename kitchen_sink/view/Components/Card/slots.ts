import { SlotDefinitions } from '@kitchen/component/Slots';

export const slots: SlotDefinitions = {
  header: {
    description: 'The topmost section',
  },
  body: {
    description: 'Slot goes after the header',
  },
  footer: {
    description: 'Slot goes after the body',
  },
  default: {
    description: 'An alias for body',
  },
};
