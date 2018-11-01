import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  content: {
    type: 'String',
    description: 'Specifies the text of divider. It has a higher priority than the slot.',
  },
  vert: {
    type: 'Boolean',
    description: 'Makes divider vertical',
    default: false,
  },
};
