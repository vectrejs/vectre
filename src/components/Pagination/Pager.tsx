import { CreateElement, VNode } from 'vue';
import { PaginationEvents } from './Events';
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

  const mediana = Math.floor((show - 4) / 2);
  return [
    ...[1, SEPARATOR],
    ...Array.from({ length: show - 3 }, (v, i) => current - mediana + i),
    ...[SEPARATOR, pages],
  ];
};

export const Pager = /*#__PURE__*/ tsx.componentFactoryOf<PaginationEvents>().create({
  name: 'Pager',
  functional: true,
  props: {
    pages: { type: Number, required: true },
    current: { type: Number, default: 1 },
    show: { type: Number, default: 6 },
  },
  render(h: CreateElement, { props, listeners }): VNode {
    const change = (page: string | number) => (): void => flattenListener(listeners.change)(page);

    const pages = items(props.pages, props.current, props.show).map((page: number | string): VNode => {
      return (
        <li staticClass="page-item page-item-num" class={props.current == page && 'active'}>
          {page === SEPARATOR && <span>{page}</span>}
          {page !== SEPARATOR && <a onClick={change(page)}>{page}</a>}
        </li>
      );
    });

    return (
      <ul staticClass="pagination">
        <li staticClass="page-item" class={props.current == 1 && 'disabled'}>
          <a tabindex={-1} onClick={change(props.current - 1)}>
            Previous
          </a>
        </li>

        {pages}

        <li staticClass="page-item" class={props.current == props.pages && 'disabled'}>
          <a onClick={change(props.current + 1)}>Next</a>
        </li>
      </ul>
    );
  },
});
