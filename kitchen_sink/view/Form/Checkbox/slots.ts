import { SlotsLists } from '@kitchen/component/Slots';

export const slots: SlotsLists = [
  {
    name: 'Checkbox',
    slots: {
      default: { description: 'Shown as a label' },
    },
  },
  {
    name: 'Checkbox Group',
    slots: {
      default: { description: 'Only nested <code>form-checkbox</code> elements will be included' },
    },
  },
];
