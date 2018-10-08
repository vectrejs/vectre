import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  text: { type: 'String', description: 'Text', required: true },
  avatar: { type: 'String', description: 'URL of an avatar image' },
  initials: {
    type: 'String',
    description:
      // tslint:disable-next-line:max-line-length
      'Initials for avatars. Shown when avatar is not defined and automatically truncated to 2 characters',
  },
  active: { type: 'Boolean', description: 'Alters colors of chip' },
};
