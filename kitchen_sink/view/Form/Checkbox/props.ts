import { PropsLists } from '@kitchen/component/Props';

export const props: PropsLists = [
  {
    name: 'Checkbox',
    props: {
      checked: {
        type: 'Boolean',
        description: 'If the checkbox is checked',
        default: false,
      },
      disabled: {
        type: 'Bolean',
        description: 'Disables the checkbox',
        default: false,
      },
      inline: {
        type: 'Bolean',
        description: 'Makes a checkbox as an inline element',
        default: false,
      },
      label: {
        type: 'String, Number',
        description: 'Label of checkbox',
      },
      type: {
        type: 'String',
        description: 'The checkbox could be shown as switch',
        accepted: 'checkbox, switch',
        default: 'checkbox',
      },
      value: {
        type: 'Any',
        // tslint:disable-next-line:max-line-length
        description:'The value of checkbox when it\'s checked. Can act as a label if it is not set',
        default: true,
      },
      size: {
        type: 'String',
        description: 'The size of checkbox',
        accepted: 'sm, lg',
      },
      error: {
        type: 'Boolean',
        description: 'Indicates that there is an error',
      },
    },
  },

  {
    name: 'Checkbox Group',
    props: {
      options: {
        type: 'Object | Any[]',
        description: 'All netsted checkboxes are ignored if the options are given',
      },
      disabled: {
        type: 'Bolean',
        description: 'Disables all checkboxes of the group',
        default: false,
      },
      inline: {
        type: 'Bolean',
        description: 'Makes checkboxes as inline elements',
        default: false,
      },
      type: {
        type: 'String',
        description: 'All checkboxes of the group could be shown as switches',
        accepted: 'checkbox, switch',
      },
      size: {
        type: 'String',
        description: 'The size of checkboxes',
        accepted: 'sm, lg',
      },
      error: {
        type: 'Boolean',
        description: 'Makes the whole group invalid',
      },
    },
  },
];
