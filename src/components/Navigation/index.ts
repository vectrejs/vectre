import { Navigation } from './Navigation';
import { NavigationItem } from './NavigationItem';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ Navigation, NavigationItem });
export { Navigation, NavigationItem };
