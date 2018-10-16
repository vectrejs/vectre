import { SlotsLists } from '@kitchen/component/Slots';

export const slots: SlotsLists = [
  {
    name: 'Select',
    slots: {
      default: {
        // tslint:disable-next-line:max-line-length
        description: 'Includes only nested <code>form-option</code> elements. Ignored if <code>options</code> prop is set',
      },
    },
  },
  {
    name: 'Option',
    slots: {
      default: { description: 'Serves as a label' },
    },
  },
];
