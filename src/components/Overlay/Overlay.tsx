import { CreateElement, VNode, VNodeDirective } from 'vue';
import { overlay } from '../../directives/Overlay';
import { OverlayEvents } from './Events';
import './styles.scss';

export const Overlay = /*#__PURE__*/ tsx.componentFactoryOf<OverlayEvents>().create({
  name: 'Overlay',
  directives: {
    overlay,
  },
  props: {
    show: { type: Boolean, default: false },
    blur: { type: [String, Number], default: undefined },
    fullscreen: { type: Boolean, default: false },
    noScroll: { type: Boolean, default: false },
    opacity: { type: [String, Number], default: 75 },
    zIndex: { type: [String, Number], default: 1 },
  },
  computed: {
    styles(): Record<string, string | number> {
      return { display: (!this.show && 'none') || 'flex', 'z-index': this.zIndex };
    },
  },

  render(h: CreateElement): VNode {
    const directives: VNodeDirective[] = [
      {
        name: 'overlay',
        modifiers: {
          fullscreen: this.fullscreen,
          noScroll: this.noScroll,
        },
        value: {
          blur: this.blur,
          show: this.show,
          opacity: this.opacity,
          onClick: this.$listeners.click,
          zIndex: 'auto',
        },
      },
    ];

    return (
      <div
        {...{ directives }}
        staticClass="overlay"
        class={{ overlay__fullscreen: this.fullscreen }}
        style={this.styles}
      >
        <div class="overlay__content" style={`backdrop-filter: blur(${this.blur}px)`}>
          {this.$slots.default}
        </div>
      </div>
    );
  },
});
