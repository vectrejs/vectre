import { defineComponent, PropType, VNode, Transition } from 'vue';
import { IconType } from '../Icon';
import { ToastType, ToastTypes } from './Type';
import { ToastIcon } from './ToastIcon';
import { ToastAction } from './ToastAction';
import { ToastBody } from './ToastBody';
import { ToastContent } from './ToastContent';
import { ToastTitle } from './ToastTitle';
import './styles.scss';

export const Toast = /*#__PURE__*/ defineComponent({
  name: 'Toast',
  props: {
    title: { type: String, default: undefined },
    content: { type: String, default: undefined },
    type: {
      type: String as PropType<ToastType>,
      default: undefined,
      validator: (side: ToastType): boolean => Object.keys(ToastTypes).includes(side),
    },
    autoclose: { type: [Number, String], default: 0 },
    closeable: { type: Boolean, default: false },
    icon: { type: String as PropType<IconType>, default: undefined },
  },
  emits: ['closed'],
  data: () => ({
    shown: true,
  }),
  mounted() {
    if (this.autoclose) {
      setTimeout(this.close, +this.autoclose);
    }
  },
  methods: {
    close(): void {
      this.shown = false;
      this.$emit('closed');
    },
    toggle(): void {
      this.shown = !this.shown;
    },
  },
  render(): VNode {
    const title = (this.$slots.title || this.title) && (
      <ToastTitle v-html={this.title}>{this.$slots.title && this.$slots.title()}</ToastTitle>
    );
    const content = (this.$slots.content || this.content) && (
      <ToastContent v-html={this.content}>{this.$slots.content && this.$slots.content()}</ToastContent>
    );
    const icon = this.icon && <ToastIcon icon={this.icon} large={!!(title && content)} />;
    const body = (title || content) && (
      <ToastBody>
        {title}
        {content}
      </ToastBody>
    );

    const closeBtn = this.closeable && <button class="btn btn-clear float-right" onClick={this.close} />;
    const action = (
      <ToastAction>
        {closeBtn}
        {this.$slots.action && this.$slots.action()}
      </ToastAction>
    );

    const sloted = this.$slots.default && <div class={['toast', ToastTypes[this.type]]}>{this.$slots.default()}</div>;

    const toast = (
      <div class={['toast', ToastTypes[this.type]]}>
        {icon}
        {body}
        {action}
      </div>
    );

    return <Transition name="toast-fade">{this.shown && (sloted || toast)}</Transition>;
  },
});
