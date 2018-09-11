import { VueComponent } from 'vue-tsx-helper';
import { Prop, Component } from 'vue-property-decorator';
import { Radio } from './Radio';

interface INormalizedOption {
  label: string;
  value: any;
}

@Component
export class Group extends VueComponent<{}> {
  @Prop()
  public options: any[] | { [label: string]: any };

  @Prop(String)
  public name: string;

  public render() {
    const name = this.name || this.$vnode.tag;
    let group;

    if (this.options) {
      group = this
        .normalizeOptions(this.options)
        .map(({ label, value }) => <Radio name={name} label={label} value={value} />);
    }

    return <div>{group}</div>;
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
