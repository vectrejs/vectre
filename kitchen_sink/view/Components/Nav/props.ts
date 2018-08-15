import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  items: { type: 'Iterable', description: 'Nav items', required: true },
  level: { type: 'Number', description: 'Max level of nesting' },
};
