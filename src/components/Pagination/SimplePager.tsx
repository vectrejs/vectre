import { defineComponent, VNode } from 'vue';
import { flattenListener } from '../../utils/listener';

export const SimplePager = /*#__PURE__*/ defineComponent({
  name: 'SimplePager',

  props: {
    pages: { type: Array as () => string[], required: true },
    current: { type: String, default: undefined },
    onChange: { type: Function, default: undefined },
  },
  emits: ['change'],
  render(): VNode {
    const change = (page: string | number) => (): void => flattenListener(this.$props.onChange)(page);

    const currentIndex = this.$props.pages.indexOf(this.$props.current);
    const previous = this.$props.pages[currentIndex - 1];
    const next = this.$props.pages[currentIndex + 1];

    return (
      <ul class="pagination">
        {previous && (
          <li class="page-item page-prev">
            <a onClick={change(previous)}>
              <div class="page-item-subtitle">Previous</div>
              <div class="page-item-title h5">{previous}</div>
            </a>
          </li>
        )}
        {next && (
          <li class="page-item page-next">
            <a onClick={change(next)}>
              <div class="page-item-subtitle">Next</div>
              <div class="page-item-title h5">{next}</div>
            </a>
          </li>
        )}
      </ul>
    );
  },
});
