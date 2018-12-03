import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';
import { Radio, IRadioProps } from './Radio';
import { VNode, CreateElement } from 'vue';
import { Size } from './Size';

interface INormalizedOption {
  label: string;
  value: any;
}

export interface IRadioGroup {
  disabled?: boolean;
  error?: boolean;
  inline?: boolean;
  options?: any[] | { [label: string]: any };
  name?: string;
  size?: Size;
  value?: any;
}

@Component
export class Group extends VueComponent<IRadioGroup> {
  @Prop()
  public options: any[] | { [label: string]: any };

  @Prop(String)
  public name: string;

  @Prop()
  public value: any;

  @Prop(Boolean)
  public inline: boolean;

  @Prop(String)
  public size: Size;

  @Prop(Boolean)
  public error: boolean;

  @Prop(Boolean)
  public disabled: boolean;

  public render(h: CreateElement): VNode {
    const name = this.name || this.uid;
    let group;

    if (this.options) {
      group = this
        .normalizeOptions(this.options)
        .map(({ label, value }) => {
          return <Radio
            name={name}
            label={label}
            value={value}
            error={this.error}
            onChange={this.update}
            inline={this.inline}
            size={this.size}
            disabled={this.disabled}
            model={this.value}
          />;
        });
    } else {
      group = (this.$slots.default || [])
        .filter(({ componentOptions }) => {
          return componentOptions
            && componentOptions.tag
            && componentOptions.tag.includes('form-radio');
        })
        .map((option: VNode) => {
          const props: IRadioProps = option.componentOptions!.propsData || {};

          props.name = name;
          props.size = props.size !== undefined ? props.size : this.size;
          props.disabled = props.disabled !== undefined ? props.disabled : this.disabled;
          props.error = props.error !== undefined ? props.error : this.error;
          props.inline = this.inline || props.inline;
          props.model = this.value;

          option.componentOptions!.listeners = {
            ...option.componentOptions!.listeners,
            change: this.update,
          };

          return option;
        });
    }

    return <div>{group}</div>;
  }

  private update(value: any) {
    this.$emit('input', value);
  }

  private get uid() {
    return 'radio-group-' + Math.round(Math.random() * 1000);
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
