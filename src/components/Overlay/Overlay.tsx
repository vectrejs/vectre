import { defineComponent, VNode } from 'vue';
import { overlay } from '../../directives/Overlay';
import './styles.scss';

export const Overlay = /*#__PURE__*/ defineComponent({
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
    onClick: { type: Function, default: undefined },
  },
  emits: ['click'],
  computed: {
    styles(): Record<string, string | number> {
      return { display: (!this.show && 'none') || 'flex', 'z-index': this.zIndex };
    },
  },
  render(): VNode {
    const params = {
      blur: this.blur,
      show: this.show,
      opacity: this.opacity,
      onClick: this.onClick,
      zIndex: 'auto',
      fullscreen: this.fullscreen,
      noScroll: this.noScroll,
    };

    return (
      <div class={{ overlay: true, overlay__fullscreen: this.fullscreen }} style={this.styles} v-overlay={[params]}>
        <div class="overlay__content" style={`backdrop-filter: blur(${this.blur}px)`}>
          {this.$slots.default && this.$slots.default()}
        </div>
      </div>
    );
  },
});
