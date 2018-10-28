import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  type: {
    description: 'Specifies the type of label',
    type: 'String',
    accepted: 'primary, secondary, warning, success, error',
  },
  rounded: {
    description: 'Makes the label rounded',
    default: false,
    type: 'Boolean',
  },
};
