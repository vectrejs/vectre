import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  title: { type: 'String', description: 'Title can contain html tags' },
  subtitle: { type: 'String', description: 'Subtitle can contain html tags' },
  avatar: { type: 'String', description: 'URL of an image' },
  icon: { type: 'String', description: 'All available icons placed insted of avatar' },
  compact: { type: 'Boolean', description: 'Show compact tile' },
};
