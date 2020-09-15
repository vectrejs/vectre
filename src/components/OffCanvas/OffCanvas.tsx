import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { IconType } from '../Icon';
import { OffCanvasToggle } from './OffCanvasToggle';
import { OffCanvasSidebar } from './OffCanvasSidebar';
import { OffCanvasOverlay } from './OffCanvasOverlay';
import { OffCanvasContent } from './OffCanvasContent';

export const OffCanvas = tsx.component({
  name: 'OffCanvas',
  props: {
    icon: { type: String as () => IconType, default: 'menu' as IconType },
    sidebar: { type: Boolean, default: true },
    overlay: { type: [Number, String], default: 0.1 },
    closeOnOverlay: { type: Boolean, default: true },
  },
  data: () => ({
    active: false,
  }),
  methods: {
    showSidebar(): void {
      this.active = true;
    },
    hideSidebar(): void {
      this.active = false;
    },
  },
  render(h: CreateElement): VNode {
    const toggle = (
      <OffCanvasToggle icon={this.icon} onClick={this.showSidebar}>
        {this.$slots.icon}
      </OffCanvasToggle>
    );

    const sidebar = this.$slots.sidebar && (
      <OffCanvasSidebar active={this.active}>{this.$slots.sidebar}</OffCanvasSidebar>
    );

    const overlay = this.overlay && (
      <OffCanvasOverlay
        opacity={this.overlay}
        onClick={(): void => {
          this.closeOnOverlay && this.hideSidebar();
        }}
      />
    );

    const content = this.$slots.content && <OffCanvasContent>{this.$slots.content}</OffCanvasContent>;

    const cssClass = ['off-canvas', this.sidebar && 'off-canvas-sidebar-show'];

    const sloted = this.$slots.default && <div class={cssClass}>{this.$slots.default}</div>;
    const offCanvas = (
      <div class={['off-canvas', this.sidebar && 'off-canvas-sidebar-show']} {...this.$attrs}>
        {toggle}
        {sidebar}
        {overlay}
        {content}
      </div>
    );

    return sloted || offCanvas;
  },
});
