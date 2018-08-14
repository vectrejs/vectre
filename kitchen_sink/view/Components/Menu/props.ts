import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  items: { type: 'Iterable', description: 'Menu items', required: true },
  active: { type: 'String, Number', description: 'Key or index of active item' },
};
