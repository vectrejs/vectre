import { Empty } from './Empty';
import { EmptyAction } from './EmptyAction';
import { EmptyContent } from './EmptyContent';
import { EmptyIcon } from './EmptyIcon';
import { EmptySubtitle } from './EmptySubtitle';
import { EmptyTitle } from './EmptyTitle';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ Empty, EmptyAction, EmptyContent, EmptyIcon, EmptySubtitle, EmptyTitle });
export { Empty, EmptyAction, EmptyContent, EmptyIcon, EmptySubtitle, EmptyTitle };
