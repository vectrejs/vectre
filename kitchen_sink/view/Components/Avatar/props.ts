import { PropDefinitions } from '@kitchen/component/Props';

export const props: PropDefinitions = {
  src: { type: 'String', description: 'URL of an image' },
  icon: { type: 'String', description: 'URL of an icon' },
  initials: {
    type: 'String',
    // tslint:disable-next-line:max-line-length
    description: 'Initials for avatars. Shown when src is not defined and automatically truncated to 2 characters',
  },
  size: {
    type: 'String',
    description: 'Additional sizes',
    default: '32px',
    accepted: 'xl, lg, sm, xs',
  },
  background: {
    type: 'String',
    description: 'Sets the background color of an avatar',
    default: '#5755d9',
    // tslint:disable-next-line:max-line-length
    accepted: '<a href=\'https://www.w3schools.com/cssref/css_colors_legal.asp\'>CSS Legal Color Values</a>',
  },
  color: {
    type: 'String',
    description: 'Sets the font color of initials',
    default: 'rgba(255, 255, 255, .85)',
    // tslint:disable-next-line:max-line-length
    accepted: '<a href=\'https://www.w3schools.com/cssref/css_colors_legal.asp\'>CSS Legal Color Values</a>',
  },
  presence: {
    type: 'String',
    description: 'Presence indicators',
    accepted: 'online, offline, busy, away',
  },
  alt: { type: 'String' },
};
