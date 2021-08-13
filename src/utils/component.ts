import { Slots } from 'vue';

export const hasSlot = (slots: Slots, name: string): boolean =>
  !!slots[name] && slots[name]().some(({ children }) => children);
