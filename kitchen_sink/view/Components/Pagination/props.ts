import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  pages: { type: 'Number, String[]', required: true },
  show: { type: 'Number', default: 5 },
  current: { type: 'Number, String', required: true, default: 1 },
};
