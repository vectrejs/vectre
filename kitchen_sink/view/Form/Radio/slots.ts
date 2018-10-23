import { SlotsLists } from '@kitchen/component/Slots';

export const slots: SlotsLists = [
  {
    name: 'Radio',
    slots: {
      default: { description: 'Shown as a label. The text of the slot can be used as value' },
    },
  },
  {
    name: 'Radio Group',
    slots: {
      default: { description: 'Only nested <code>form-radio</code> elements will be included' },
    },
  },
];
