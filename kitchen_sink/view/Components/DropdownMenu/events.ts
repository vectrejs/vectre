import { EventDefinitions } from '@kitchen/component/Events';

export const events: EventDefinitions = {
  opened: { description: 'Emitted when button was clicked and menu is shown' },
  closed: { description: 'Emitted when you click anywhere during the menu dispaly' },
};
