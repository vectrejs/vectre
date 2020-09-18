import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { PaginationEvents } from './Events';
import { flattenListener } from '../../utils/listener';

export const SimplePager = /*#__PURE__*/ tsx.componentFactoryOf<PaginationEvents>().create({
  name: 'SimplePager',
  functional: true,
  props: {
    pages: { type: Array as () => string[], required: true },
    current: { type: String, default: undefined },
  },
  render(h: CreateElement, { props, listeners }): VNode {
    const change = (page: string | number) => (): void => flattenListener(listeners.change)(page);

    const currentIndex = props.pages.indexOf(props.current);
    const previous = props.pages[currentIndex - 1];
    const next = props.pages[currentIndex + 1];

    return (
      <ul class="pagination">
        {previous && (
          <li staticClass="page-item page-prev">
            <a onClick={change(previous)}>
              <div staticClass="page-item-subtitle">Previous</div>
              <div staticClass="page-item-title h5">{previous}</div>
            </a>
          </li>
        )}
        {next && (
          <li staticClass="page-item page-next">
            <a onClick={change(next)}>
              <div staticClass="page-item-subtitle">Next</div>
              <div staticClass="page-item-title h5">{next}</div>
            </a>
          </li>
        )}
      </ul>
    );
  },
});
