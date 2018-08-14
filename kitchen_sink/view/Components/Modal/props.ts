import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  show: {
    type: 'Boolean',
    description: 'To make a modal appear',
    default: false,
  },
  size: {
    type: 'String',
    description: 'Size of modal. The default size is 640px. Large is 960px and small is 320px',
    accepted: 'lg, sm',
  },
  overlay: {
    type: 'Boolean',
    description: 'Show overlay. Don\'t disable it for large modals.',
    default: true,
  },
  closeBtn: {
    type: 'Boolean',
    description: 'Show close button',
    default: true,
  },
  closeOverlay: {
    type: 'Boolean',
    description: 'Сlose the modal when clicking on the overlay',
    default: true,
  },
};
