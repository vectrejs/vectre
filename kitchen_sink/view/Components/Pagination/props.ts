import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  pages: {
    type: 'Number, String[]',
    description: 'Total number of pages or array with page titles',
    required: true,
  },
  show: {
    type: 'Number',
    description: 'Number of pages shown',
    default: 6,
  },
  current: {
    type: 'Number, String',
    description: 'Current page',
    default: '1st element',
  },
};
