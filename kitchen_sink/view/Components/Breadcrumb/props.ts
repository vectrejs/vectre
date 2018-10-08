import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  crumbs: {
    type: '{ path: string, title: string }, Object[]',
    description: 'Elements shown as breadcrumbs',
    required: true,
  },
};
