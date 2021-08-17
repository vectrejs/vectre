import { defineComponent, VNode } from 'vue';
import { PanelHeader } from './PanelHeader';
import { PanelNav } from './PanelNav';
import { PanelBody } from './PanelBody';
import { PanelFooter } from './PanelFooter';

export const Panel = defineComponent({
  name: 'Panel',
  render(): VNode {
    const { header, nav, body, footer, default: _default } = this.$slots;

    return (
      <div class="panel">
        {header && <PanelHeader>{header()}</PanelHeader>}
        {nav && <PanelNav>{nav()}</PanelNav>}
        {body && <PanelBody>{body()}</PanelBody>}
        {footer && <PanelFooter>{footer()}</PanelFooter>}
        {_default && _default()}
      </div>
    );
  },
});
