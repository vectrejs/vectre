import * as tsx from 'vue-tsx-support';
import { CreateElement, VNode } from 'vue';
import { flattenListener } from '../../utils/listener';
import { PaginationEvents } from './Events';
import { SimplePager } from './SimplePager';
import { Pager } from './Pager';
import './styles.scss';

export const Pagination = tsx.componentFactoryOf<PaginationEvents>().create({
  name: 'Pagination',
  functional: true,
  model: {
    prop: 'current',
    event: 'change',
  },
  props: {
    pages: { type: [Number, Array] as (() => number | string[])[], required: true },
    current: { type: [Number, String], default: undefined },
    show: { type: Number, default: undefined },
  },
  render(h: CreateElement, { props, listeners }): VNode {
    const change = flattenListener(listeners.change);

    if (Array.isArray(props.pages)) {
      return <SimplePager pages={props.pages} current={String(props.current)} onChange={change} />;
    }

    return <Pager pages={props.pages} current={Number(props.current)} onChange={change} />;
  },
});
