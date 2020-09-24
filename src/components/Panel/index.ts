import { Panel } from './Panel';
import { PanelHeader } from './PanelHeader';
import { PanelBody } from './PanelBody';
import { PanelFooter } from './PanelFooter';
import { PanelNav } from './PanelNav';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ Panel, PanelBody, PanelHeader, PanelFooter, PanelNav });
export { Panel, PanelBody, PanelHeader, PanelFooter, PanelNav };
