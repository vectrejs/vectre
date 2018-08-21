import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  side: {
    type: 'String',
    description: 'Position of popover',
    default: 'top',
    accepted: 'top, left, right, bottom',
  },
};
