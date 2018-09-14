import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';
import { Radio, IRadioProps } from './Radio';
import { VNode } from 'vue';

interface INormalizedOption {
  label: string;
  value: any;
}

export interface IRadioGroup {
  options?: any[] | { [label: string]: any };
  name?: string;
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

  public render() {
    const name = this.name || this.$vnode.tag;
    let group;

    if (this.options) {
      group = this
        .normalizeOptions(this.options)
        .map(({ label, value }) => {
          return <Radio
            name={name}
            label={label}
            value={value}
            checked={this.isChecked(label, value)}
            onChange={this.update}
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
          const props = option.componentOptions!.propsData as IRadioProps;
          const value = props.value || (option.componentOptions!.children![0] as VNode).text;

          props.name = name;

          props.checked = props.checked !== undefined
            ? props.checked
            : this.isChecked(props.label, value);

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

  // tslint:disable-next-line:max-line-length
  private isChecked(label: string | number | undefined, value: string | number | undefined): boolean {
    return (label !== undefined && this.value.toString() === label.toString())
      || (value !== undefined && this.value.toString() === value.toString());
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
