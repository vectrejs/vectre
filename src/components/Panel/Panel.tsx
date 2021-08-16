import { mergeCss } from '../../utils/css';
import { CreateElement, VNode } from 'vue';
import { PanelHeader } from './PanelHeader';
import { PanelNav } from './PanelNav';
import { PanelBody } from './PanelBody';
import { PanelFooter } from './PanelFooter';

export const Panel = tsx.component({
  name: 'Panel',
  functional: true,
  render(h: CreateElement, { data, slots }): VNode {
    const cssClass = mergeCss(data, 'panel');
    const { header, nav, body, footer, default: _default } = slots();

    return (
      <div {...data} class={cssClass}>
        {header && <PanelHeader>{header}</PanelHeader>}
        {nav && <PanelNav>{nav}</PanelNav>}
        {body && <PanelBody>{body}</PanelBody>}
        {footer && <PanelFooter>{footer}</PanelFooter>}
        {_default}
      </div>
    );
  },
});
