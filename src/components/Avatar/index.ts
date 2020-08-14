import Avatar from './Avatar.vue';
import { makePluggableComponents } from 'src/utils/plugin';

export default makePluggableComponents({ Avatar });
export { Avatar };
export { AvatarSize, AvatarSizes } from './Size';
export { AvatarPresence, AvatarPresences } from './Presence';
