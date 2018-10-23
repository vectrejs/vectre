import { PropsLists } from '@kitchen/component/Props';

export const props: PropsLists = [
  {
    name: 'Radio',
    props: {
      label: {
        type: 'String',
        description: 'Label of radio button',
      },
      value: {
        type: 'Any',
        description:'The value of radio when it\'s checked. Can act as a label if it is not set',
      },
      name: {
        type: 'String',
        // tslint:disable-next-line:max-line-length
        description: 'Group of radios defined by name. In one group can be chosen only one radio button.',
      },
      checked: {
        type: 'Boolean',
        description: 'If the radio is checked',
        default: false,
      },
      disabled: {
        type: 'Boolean',
        description: 'Disables the radio button',
        default: false,
      },
      error: {
        type: 'Boolean',
        description: 'Indicates that there is an error',
      },
      inline: {
        type: 'Boolean',
        description: 'Makes a radio as an inline element',
        default: false,
      },
      size: {
        type: 'String',
        description: 'The size of radio button',
        accepted: 'sm, lg',
      },
    },
  },

  {
    name: 'Radio Group',
    props: {
      options: {
        type: 'Object | Any[]',
        description: 'All netsted radio buttons are ignored if the options are given',
      },
      name: {
        type: 'String',
        // tslint:disable-next-line:max-line-length
        description: 'The name is applied to the each radio of the group',
      },
      disabled: {
        type: 'Boolean',
        description: 'Disables all radio buttons of the group',
        default: false,
      },
      error: {
        type: 'Boolean',
        description: 'Makes the whole group invalid',
      },
      inline: {
        type: 'Boolean',
        description: 'Makes radio buttons inline',
        default: false,
      },
      size: {
        type: 'String',
        description: 'The size of the whole group',
        accepted: 'sm, lg',
      },
    },
  },
];
