import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  type: {
    description: 'Specifies which icon will be displayed',
    required: true,
    type: 'String',
  },
  size: {
    description: 'Sets the size of the icon. May take font size as value',
    type: 'String',
    accepted: 'x2, x3, x4',
  },
};
