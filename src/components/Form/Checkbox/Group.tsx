import { Prop, Component } from 'vue-property-decorator';
import { Checkbox } from './Checkbox';
import { VNode, CreateElement, VNodeComponentOptions } from 'vue';
import { Type } from './Type';
import { Size } from './Size';
import * as tsx from 'vue-tsx-support';

interface NormalizedOption {
  label: string;
  value: any;
}

interface CheckboxGroup {
  disabled?: boolean;
  inline?: boolean;
  options?: any[] | { [label: string]: any };
  size?: Size;
  type: Type;
  value?: any[];
}

@Component({
  name: 'FormCheckboxGroup',
})
export class Group extends tsx.Component<CheckboxGroup> {
  @Prop([Array, Object])
  public options?: any[] | { [label: string]: any };

  @Prop({ type: Array, default: (): any[] => [] })
  public value: any[];

  @Prop(Boolean)
  public inline: boolean;

  @Prop(String)
  public type: Type;

  @Prop(String)
  public size: Size;

  @Prop(Boolean)
  public disabled: boolean;

  @Prop(Boolean)
  public error: boolean;

  public render(h: CreateElement): VNode {
    let group;

    if (this.options) {
      group = this.normalizeOptions(this.options).map(({ label, value }) => {
        return (
          <Checkbox
            value={value}
            label={label}
            onChange={this.update}
            inline={this.inline}
            type={this.type}
            size={this.size}
            disabled={this.disabled}
            error={this.error}
            {...{ props: { model: this.value } }}
          />
        );
      });
    } else {
      group = (this.$slots.default || [])
        .filter(({ componentOptions }) => {
          return componentOptions && componentOptions.tag && componentOptions.tag.includes('form-checkbox');
        })
        .map((option: VNode) => {
          if (!option.componentOptions) {
            option.componentOptions = {} as VNodeComponentOptions;
          }
          if (!option.componentOptions.propsData) {
            option.componentOptions.propsData = {};
          }
          const props = option.componentOptions.propsData as InstanceType<typeof Checkbox>;
          props.model = this.value;
          props.inline = this.inline || props.inline;
          props.type = this.type || props.type;
          props.size = props.size !== undefined ? props.size : this.size;
          props.disabled = props.disabled !== undefined ? props.disabled : this.disabled;
          props.error = props.error !== undefined ? props.error : this.error;

          option.componentOptions.listeners = {
            ...option.componentOptions.listeners,
            change: this.update,
          };

          return option;
        });
    }

    return <div>{group}</div>;
  }

  private update(value: any): void {
    this.$emit('input', value);
  }

  private normalizeOptions(options: { [label: string]: any } | string[]): NormalizedOption[] {
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
