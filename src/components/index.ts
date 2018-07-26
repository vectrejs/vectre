import Accordion from './Accordion.vue';
import Bar from './Bar';
import Toast from './Toast.vue';
import OffCanvas from './OffCanvas.vue';

import Icon, {
  Size as IconSize,
  Type as IconType,
  Action as IconAction,
  Navigation as IconNavigation,
  Objects as IconObject
} from './Icon';

import Avatar, {
  Size as AvatarSize
} from './Avatar';


// Default is all components
export default {
  Accordion,
  Bar,
  Avatar,
  Icon,
  OffCanvas,
  Toast,
};

export {
  // Components
  Accordion,
  Avatar,
  Bar,
  Icon,
  OffCanvas,
  Toast,

  // Icon
  IconSize,
  IconType,
  IconAction,
  IconNavigation,
  IconObject,

  // Avatar
  AvatarSize
}


