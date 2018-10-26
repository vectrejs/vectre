import { PropsLists } from '@kitchen/component/Props';

export const props: PropsLists = [
  {
    name: 'Button',
    props: {
      type: {
        type: 'String',
        description: 'Specifies the type of button',
        accepted: 'primary, link, success, error, close',
      },
      size: {
        description: 'Specifies the size of button',
        accepted: 'sm, lg, block',
        type: 'String',
      },
      state: {
        type: 'String',
        description: 'Specifies the state of button',
        accepted: 'active, disabled, loading',
      },
      icon: {
        type: 'String',
        description: 'all available icons',
      },
      left: {
        type: 'Boolean',
        default: false,
      },
      action: {
        type: 'Boolean',
        description: 'Makes a square icon button',
        default: false,
      },
      circle: {
        type: 'Boolean',
        description: 'Turns a square action button into a round button',
        default: false,
      },
    },
  },

  {
    name: 'Button Group',
    props: {
      block: {
        description: 'Makes a full-witdth button group',
        default: false,
        type: 'Boolean',
      },
    },
  },
];
