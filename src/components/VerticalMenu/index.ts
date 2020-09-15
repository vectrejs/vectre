import { VerticalMenu } from './VerticalMenu';
import { VerticalMenuDivider } from './VerticalMenuDivider';
import { VerticalMenuItem } from './VerticalMenuItem';
import { VerticalMenuItemBadge } from './VerticalMenuItemBadge';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ VerticalMenu, VerticalMenuDivider, VerticalMenuItem, VerticalMenuItemBadge });
export { VerticalMenu, VerticalMenuDivider, VerticalMenuItem, VerticalMenuItemBadge };
