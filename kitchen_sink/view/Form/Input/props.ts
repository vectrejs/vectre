import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  success: {
    type: 'Boolean',
    default: false,
    description: 'Indicates that the selection is valid',
  },
  error: {
    type: 'Boolean',
    default: false,
    description: 'Indicates that there is an error',
  },
  loading: {
    type: 'Boolean',
    default: false,
    // tslint:disable-next-line:max-line-length
    description: 'Displays the loading icon. The position can be set with <code>iconSide</code> property',
  },
  icon: { type: 'String' },
  iconSide: {
    type: 'String',
    description: 'The position of icon',
    accepted: 'left, right',
    default: 'right',
  },
  size: { type: 'String', description: 'Specifies the size of input', accepted: 'sm, lg' },
};
