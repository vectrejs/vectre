import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { uid } from '../../utils/uid';
import { Icon, IconType } from '../Icon';
import { AccordionEvents } from './Event';

export const Accordion = /*#__PURE__*/ tsx.componentFactoryOf<AccordionEvents>().create({
  name: 'Accordion',
  props: {
    items: { required: true, type: [Object, Array] as (() => Record<string | number, string> | string[])[] },
    checked: { type: [String, Number, Array], default: undefined },
    name: { type: String, default: undefined },
    multiple: { type: Boolean },
    icon: { type: String as () => IconType, default: undefined },
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
      if (!this.$listeners.check) return;

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
  render(h: CreateElement): VNode {
    const items = Array.isArray(this.items) ? { ...this.items } : this.items;

    const accordionItems = Object.keys(items).map((key, index) => {
      const id = `${this.$_name}-${key}`;
      const type = this.multiple ? 'checkbox' : 'radio';
      const headerSlot = this.$scopedSlots['header'];
      const bodySlot = this.$scopedSlots['body'] || this.$scopedSlots['default'];

      return (
        <div staticClass="accordion">
          <input
            id={id}
            name={this.$_name}
            type={type}
            checked={this.isChecked(key, index)}
            onInput={(e: Event): void => this.toggle(e, key, index)}
            hidden
          />

          <label staticClass="accordion-header c-hand" for={id}>
            {this.icon && <Icon name={this.icon} />}
            {headerSlot && headerSlot({ header: key, item: items[key as any] })}
            {!headerSlot && key}
          </label>

          {!bodySlot && <div staticClass="accordion-body" domPropsInnerHTML={items[key as any]} />}
          {bodySlot && <div staticClass="accordion-body">{bodySlot({ header: key, item: items[key as any] })}</div>}
        </div>
      );
    });

    return <div staticClass="accordion-container">{accordionItems}</div>;
  },
});
