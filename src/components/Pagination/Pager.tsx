import { defineComponent, VNode } from 'vue';
import { flattenListener } from '../../utils/listener';

const SEPARATOR = ' ... ';
export type PagerItem = number | string;

const items = (pages: number, current: number, show: number): PagerItem[] => {
  const half = Math.round((show + 1) / 2);

  if (current <= half) {
    return [...Array.from({ length: show - 1 }, (v, i) => i + 1), ...[SEPARATOR, pages]];
  }

  if (current + half > pages) {
    return [...[1, SEPARATOR], ...Array.from({ length: show - 1 }, (v, i) => pages - show + 2 + i)];
  }

  const median = Math.floor((show - 4) / 2);
  return [
    ...[1, SEPARATOR],
    ...Array.from({ length: show - 3 }, (v, i) => current - median + i),
    ...[SEPARATOR, pages],
  ];
};

export const Pager = /*#__PURE__*/ defineComponent({
  name: 'Pager',
  props: {
    pages: { type: Number, required: true },
    current: { type: Number, default: 1 },
    show: { type: Number, default: 6 },
    onChange: { type: Function, default: undefined },
  },
  emits: ['change'],
  render(): VNode {
    const change = (page: string | number) => (): void => flattenListener(this.$props.onChange)(page);

    const pages = items(this.$props.pages, this.$props.current, this.$props.show).map(
      (page: number | string): VNode => {
        return (
          <li class={['page-item page-item-num', this.$props.current == page && 'active']}>
            {page === SEPARATOR && <span>{page}</span>}
            {page !== SEPARATOR && <a onClick={change(page)}>{page}</a>}
          </li>
        );
      },
    );

    return (
      <ul class="pagination">
        <li class={['page-item', this.$props.current == 1 && 'disabled']}>
          <a tabindex={-1} onClick={change(this.$props.current - 1)}>
            Previous
          </a>
        </li>

        {pages}

        <li class={['page-item', this.$props.current == this.$props.pages && 'disabled']}>
          <a onClick={change(this.$props.current + 1)}>Next</a>
        </li>
      </ul>
    );
  },
});
