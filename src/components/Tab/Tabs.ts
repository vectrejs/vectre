import vue, { PropOptions, CreateElement } from 'vue';
import Tab from './Tab.vue';

// tslint:disable-next-line:max-line-length
const createTab = (h: CreateElement, item: string, isActive: boolean, emit: (event: string, ...args: any[]) => vue) => {
  return h(
    Tab,
    {
      class: { active: isActive },
      nativeOn: {
        click: () => !isActive && emit('update:current', item),
      },
    },
    [item],
  );
};

export const Tabs = vue.extend({
  props: {
    current: {
      type: String,
    },
    items: {
      type: Array,
      default: [],
    } as PropOptions<string[]>,
  },

  render(h) {
    const { items, current } = this.$props;
    let tabs: any = [];

    if (items) {
      tabs = items.map((item: string) => {
        return createTab(h, item, current === item, this.$emit.bind(this));
      });
    }

    return h('div', { class: 'tab' }, tabs);
  },
});
