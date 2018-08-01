import Accordion from './Accordion.vue';
import Bar from './Bar';
import Toast from './Toast.vue';
import OffCanvas from './OffCanvas.vue';
import { Breadcrumb } from "./Breadcrumb";
import { Card } from "./Card";
import { Chip } from "./Chip";

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
  Avatar,
  Bar,
  Breadcrumb,
  Card,
  Chip,
  Icon,
  OffCanvas,
  Toast,
};

export {
  // Components
  Accordion,
  Avatar,
  Bar,
  Breadcrumb,
  Card,
  Chip,
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


