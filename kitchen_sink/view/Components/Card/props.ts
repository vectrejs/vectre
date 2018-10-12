import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  img: { type: 'String', description: 'URL of an image' },
  before: {
    type: 'String',
    description: 'A postion of an image',
    accepted: 'header, body, footer',
  },
  after: {
    type: 'String',
    description: 'A postion of an image',
    accepted: 'header, body, footer',
  },
};
