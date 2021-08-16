import { defineComponent, PropType, VNode } from 'vue';
import { uid } from '../../utils/uid';
import { Icon, IconType } from '../Icon';

export const Accordion = /*#__PURE__*/ defineComponent({
  name: 'Accordion',
  props: {
    items: {
      required: true,
      type: [Object, Array] as PropType<Record<string, unknown> | string[] | unknown[]>,
    },
    checked: { type: [String, Number, Array], default: undefined },
    name: { type: String, default: undefined },
    multiple: { type: Boolean },
    icon: { type: String as () => IconType, default: undefined },
  },
  emits: {
    check: null,
  },
  computed: {
    $_name(): string {
      return this.name || 'accordion-' + uid(this);
    },
  },
  methods: {
    isChecked(key: string, index: number): boolean {
      if (!Array.isArray(this.checked)) {
        return !!this.checked && (this.checked === key || this.checked.toString() === index.toString());
      }

      return this.checked.indexOf(index) !== -1 || this.checked.indexOf(key) !== -1;
    },
    toggle(event: Event, key: string, index: number): void {
      if (!this.onCheck) return;

      if (!this.multiple) {
        this.$emit('check', key || index || 0);
        return;
      }

      let checked = Array.isArray(this.checked) ? [...this.checked] : this.checked !== undefined ? [this.checked] : [];

      if ((event.target as HTMLInputElement).checked) {
        checked.push(key || index || 0);
      } else {
        checked = checked.filter((item) => item !== index && item !== key);
      }

      this.$emit('check', checked);
    },
  },
  render(): VNode {
    const items = Array.isArray(this.$props.items) ? { ...this.$props.items } : this.$props.items;
    const headerSlot = this.$slots.header;
    const bodySlot = this.$slots.body || this.$slots.default;

    const accordionItems = Object.keys(items).map((key, index) => {
      const id = `${this.$_name}-${key}`;
      const type = this.multiple ? 'checkbox' : 'radio';

      return (
        <div class="accordion">
          <input
            id={id}
            name={this.$_name}
            type={type}
            checked={this.isChecked(key, index)}
            onInput={(e: Event): void => this.toggle(e, key, index)}
            hidden
          />

          <label class="accordion-header c-hand" for={id}>
            {this.icon && <Icon name={this.icon} />}
            {headerSlot && headerSlot({ header: key, item: items[key as any] })}
            {!headerSlot && key}
          </label>

          {!bodySlot && <div class="accordion-body" innerHTML={items[key] as string} />}
          {bodySlot && <div class="accordion-body">{bodySlot({ header: key, item: items[key] })}</div>}
        </div>
      );
    });

    return <div class="accordion-container">{accordionItems}</div>;
  },
});
