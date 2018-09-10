import { VNode } from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { default as Option } from './SelectOption';
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

interface IOptionData {
  label: string;
  value: any;
}

@Component
export default class extends VueComponent<IProps> {
  @Prop()
  public options: { [label: string]: any } | string[];

  @Prop()
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

    if (this.placeholder) {
      options.push(<Option>{this.placeholder}</Option>);
    }

    if (this.options) {
      options = options.concat(
        this
          .normalizeOptions(this.options)
          .map(({ label, value }: IOptionData) => {
            return <Option
              selected={this.isSelected(label, value)}
              label={label}
              value={value}
            />;
          }),
      );
    } else {
      options = this.$slots.default;
    }

    return <select class="form-select" multiple={this.multiple} {...{ on: this.listeners }}>
      {options}
    </select>;
  }

  private get listeners() {
    return { ...this.$listeners, input: this.onInput };
  }

  private onInput({ target: { value, selectedOptions } }: InputEvent): void {
    if (this.multiple) {
      const selected = [...selectedOptions].map((option: HTMLOptionElement) => {
        return option.value || option.innerHTML;
      });
      this.$emit('input', selected);
    } else {
      this.$emit('input', value);
    }
  }

  private isSelected(label: string, value: string): boolean {
    if (Array.isArray(this.value)) {
      return this.value.includes(label) || this.value.includes(value);
    }

    return this.value.toString() === label || this.value.toString() === value;
  }

  private normalizeOptions(options: { [label: string]: any } | string[]): IOptionData[] {
    if (Array.isArray(options)) {
      return options.reduce(
        (normal: IOptionData[], value) => normal.concat({ value, label: value }),
        [],
      );
    }

    const normalized = [];
    for (const label of Object.keys(options)) {
      normalized.push({ label, value: options[label] });
    }

    return normalized;
  }
}
