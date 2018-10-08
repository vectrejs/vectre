import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  items: { type: 'Iterable', description: 'Menu items', required: true },
  'btn-text': { type: 'String', description: 'Button text' },
  'btn-icon': { type: 'String', description: 'Button icon', default: 'caret' },
  'btn-type': {
    type: 'String',
    description: 'Button type',
    accepted: 'primary, link, success, error',
  },
  state: {
    type: 'String',
    description: 'State of dropdown',
    accepted: 'loading, disabled, active',
  },
  right: { type: 'Boolean', description: 'Align right to prevent it appearing off screen' },
};
