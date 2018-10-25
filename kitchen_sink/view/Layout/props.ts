import { PropsLists } from '@kitchen/component/Props';

export const props: PropsLists = [
  {
    name: 'Container',
    props: {
      grid: {
        description: 'Makes a container as fixed-width',
        type: 'String',
        accepted: 'xs, sm, md, lg, xl',
      },
    },
  },

  {
    name: 'Columns',
    props: {
      oneline: {
        description: 'Arranges all columns in one row regardless of size',
        default: false,
        type: 'Boolean',
      },
      gapless: {
        description: 'Removes indentation between columns',
        default: false,
        type: 'String',
      },
    },
  },

  {
    name: 'Column',
    props: {
      col: {
        description: 'apply to all window width, including the width wider than 1280px',
        type: 'Number',
        accepted: '1-12',
      },
      xs: {
        description: 'apply to window width smaller than or equal to 480px',
        type: 'Number',
        accepted: '1-12',
      },
      sm: {
        description: 'apply to window width smaller than or equal to 600px',
        type: 'Number',
        accepted: '1-12',
      },
      md: {
        description: 'apply to window width smaller than or equal to 840px',
        type: 'Number',
        accepted: '1-12',
      },
      lg: {
        description: 'apply to window width smaller than or equal to 960px',
        type: 'Number',
        accepted: '1-12',
      },
      xl: {
        description: 'apply to window width smaller than or equal to 1280px',
        type: 'Number',
        accepted: '1-12',
      },
      mx: { description: 'Auto margin from left and right side', type: 'Boolean', default: false },
      ml: { description: 'Auto margin from left side', type: 'Boolean', default: false },
      mr: { description: 'Auto margin from right side', type: 'Boolean', default: false },
    },
  },
];
