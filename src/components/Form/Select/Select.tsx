import { VNode } from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { Option, IOptionProps } from './Option';
import { VueComponent } from 'vue-tsx-helper';

interface InputEvent {
  target: {
    value: string,
    selectedOptions: HTMLCollectionOf<HTMLOptionElement>,
  };
}

interface IProps {
  options?: { [label: string]: string } | string[];
  multiple?: boolean;
  placeholder?: string;
  value?: string | string[];
}

interface INormalizedOption {
  label: string;
  value: any;
}

@Component
export class Select extends VueComponent<IProps> {
  @Prop()
  public options: { [label: string]: any } | string[];

  @Prop({ default: '' })
  public value: string | string[];

  @Prop(Boolean)
  public multiple: boolean;

  @Prop(String)
  public placeholder: string;

  public mounted() {
    if (!this.options && !this.$slots.default) {
      throw new TypeError('Component could not be created without options');
    }
  }

  public render(): VNode {
    let options: VNode[] = [];

    if (this.options) {
      options = this
        .normalizeOptions(this.options)
        .map(({ label, value }: INormalizedOption) => {
          return <Option
            selected={this.isSelected(label, value)}
            label={label}
            value={value}
          />;
        });
    } else {
      options = (this.$slots.default || [])
        .filter(({ componentOptions }) => {
          return componentOptions
            && componentOptions.tag
            && componentOptions.tag.includes('form-option');
        })
        .map((option: VNode) => {
          const props = option.componentOptions!.propsData as IOptionProps;
          const value = props.value || (option.componentOptions!.children![0] as VNode).text;

          props.selected = props.selected !== undefined
            ? props.selected
            : this.isSelected(props.label, value);

          return option;
        });
    }

    if (this.placeholder && !this.multiple) {
      options.unshift(<Option>{this.placeholder}</Option>);
    }

    return <select class="form-select" multiple={this.multiple} {...{ on: this.listeners }}>
      {options}
    </select >;
  }

  private get listeners() {
    return { ...this.$listeners, input: this.onInput };
  }

  private onInput({ target: { selectedOptions } }: InputEvent): void {
    if (this.multiple) {
      const selected = [...selectedOptions].map((option: HTMLOptionElement) => {
        return option.value || option.innerHTML;
      });
      this.$emit('input', selected);
    } else {
      this.$emit('input', selectedOptions[0].value || selectedOptions[0].innerHTML);
    }
  }

  // tslint:disable-next-line:max-line-length
  private isSelected(label: string | number | undefined, value: string | number | undefined, current = this.value): boolean {
    if (current instanceof Array) {
      return current.some((v: string) => this.isSelected(label, value, v));
    }

    return (label !== undefined && current.toString() === label.toString())
      || (value !== undefined && current.toString() === value.toString());
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
