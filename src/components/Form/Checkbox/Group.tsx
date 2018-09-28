import { Prop, Component } from 'vue-property-decorator';
import { default as Checkbox, ICheckboxProps } from './Checkbox';
import { VueComponent } from 'vue-tsx-helper';
import { VNode } from 'vue';
import { CheckboxType, CheckboxTypes } from '@components/Form/Checkbox/Type';
import { Sizes } from './Size';

interface INormalizedOption {
  label: string;
  value: any;
}

interface ICheckboxGroup {
  options?: any[] | { [label: string]: any };
  value?: any[];
  type: keyof typeof CheckboxType;
  inline?: boolean;
  size?: Sizes;
}

@Component
export class Group extends VueComponent<ICheckboxGroup> {
  @Prop([Array, Object])
  public options?: any[] | { [label: string]: any };

  @Prop({ type: Array, default: () => [] })
  public value: any[];

  @Prop(Boolean)
  public inline: boolean;

  @Prop(String)
  public type: CheckboxTypes;

  @Prop(String)
  public size: Sizes;

  public render() {
    let group;

    if (this.options) {
      group = this
        .normalizeOptions(this.options)
        .map(({ label, value }) => {
          return <Checkbox
            label={label}
            value={value}
            model={this.value}
            onInput={this.update}
            inline={this.inline}
            type={this.type}
            size={this.size}
          />;
        });
    } else {
      group = (this.$slots.default || [])
        .filter(({ componentOptions }) => {
          return componentOptions
            && componentOptions.tag
            && componentOptions.tag.includes('form-checkbox');
        })
        .map((option: VNode) => {
          const props: ICheckboxProps = option.componentOptions!.propsData || {};
          props.model = this.value;
          props.inline = this.inline || props.inline;
          props.type = this.type || props.type;
          props.size = props.size || this.size;

          option.componentOptions!.listeners = {
            ...option.componentOptions!.listeners,
            input: this.update,
          };

          return option;
        });
    }

    return <div>{group}</div>;
  }

  private update(value: any) {
    this.$emit('input', value);
  }

  private normalizeOptions(options: { [label: string]: any } | string[]): INormalizedOption[] {
    if (Array.isArray(options)) {
      return options.reduce((normal, value) => [...normal, { value, label: value }], [] as any[]);
    }

    const normalized = [];
    for (const label of Object.keys(options)) {
      normalized.push({ label, value: options[label] });
    }

    return normalized;
  }
}
