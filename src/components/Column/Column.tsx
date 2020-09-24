import { CreateElement, VNode } from 'vue';
import * as tsx from 'vue-tsx-support';

const sizeValidator = (size: number): boolean => size % 1 === 0 && size > 0 && size <= 12;
const cssClass = (props: Record<string, any>): string[] => {
  return [
    'column',
    props.mr ? 'col-mr-auto' : '',
    props.ml ? 'col-ml-auto' : '',
    props.mx ? 'col-mx-auto' : '',
    props.xs ? `col-xs-${props.xs}` : '',
    props.sm ? `col-sm-${props.sm}` : '',
    props.md ? `col-md-${props.md}` : '',
    props.lg ? `col-lg-${props.lg}` : '',
    props.xl ? `col-xl-${props.xl}` : '',
    props.col ? `col-${props.col}` : '',
    props.hide ? `hide-${props.hide}` : '',
    props.show ? `show-${props.show}` : '',
  ];
};

export const Column = tsx.createComponent({
  name: 'Column',
  functional: true,
  props: {
    ml: { type: Boolean },
    mx: { type: Boolean },
    mr: { type: Boolean },
    xs: { type: [Number, String], validator: sizeValidator },
    sm: { type: [Number, String], validator: sizeValidator },
    md: {
      type: [Number, String],
      validator: sizeValidator,
    },
    lg: { type: [Number, String], validator: sizeValidator },
    xl: {
      type: [Number, String],
      validator: sizeValidator,
    },
    col: { type: [Number, String], validator: sizeValidator },
    hide: {
      type: [Number, String],
      validator: sizeValidator,
    },
    show: { type: [Number, String], validator: sizeValidator },
  },
  render(h: CreateElement, { props, children, data }): VNode {
    return (
      <div class={cssClass(props)} {...data}>
        {children}
      </div>
    );
  },
});
