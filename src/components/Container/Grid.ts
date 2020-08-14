export enum Grids {
  xs = 'grid-xs', // 480px
  sm = 'grid-sm', // 600px
  md = 'grid-md', // 840px
  lg = 'grid-lg', // 960px
  xl = 'grid-xl', // 1280px
}

export type Grid = keyof typeof Grids;
