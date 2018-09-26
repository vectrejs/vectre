import { Prop, Component } from 'vue-property-decorator';
import { default as Checkbox, ICheckboxProps } from './Checkbox';
import { VueComponent } from 'vue-tsx-helper';
import { VNode } from 'vue';
import { CheckboxType } from '@components/Form/Checkbox/CheckboxType';

interface INormalizedOption {
  label: string;
  value: any;
}

interface ICheckboxGroup {
  options?: any[] | { [label: string]: any };
  value?: any[];
  type: keyof typeof CheckboxType;
}

@Component({
  model: {
    prop: 'value',
  },
})
export class Group extends VueComponent<ICheckboxGroup> {
  @Prop([Array, Object])
  public options?: any[] | { [label: string]: any };

  @Prop({ type: Array, default: () => [] })
  public value: any[];

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
          (option.componentOptions!.propsData as ICheckboxProps).model = this.value;

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
