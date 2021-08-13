import { defineComponent, VNode } from 'vue';

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

export const Column = defineComponent({
  name: 'Column',
  props: {
    ml: { type: Boolean },
    mx: { type: Boolean },
    mr: { type: Boolean },
    xs: { type: [Number, String], validator: sizeValidator, default: undefined },
    sm: { type: [Number, String], validator: sizeValidator, default: undefined },
    md: {
      type: [Number, String],
      validator: sizeValidator,
      default: undefined,
    },
    lg: { type: [Number, String], validator: sizeValidator, default: undefined },
    xl: {
      type: [Number, String],
      validator: sizeValidator,
      default: undefined,
    },
    col: { type: [Number, String], validator: sizeValidator, default: undefined },
    hide: {
      type: [Number, String],
      default: undefined,
    },
    show: { type: [Number, String], default: undefined },
  },
  setup(props, { attrs, slots }) {
    return (): VNode => (
      <div class={cssClass(props)} {...attrs}>
        {slots && slots.default()}
      </div>
    );
  },
});
