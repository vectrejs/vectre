import { VNodeData } from 'vue';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mergeCss = (data: VNodeData, staticClass?: string, cssClass?: any): any[] => {
  return [data.class, data.staticClass, cssClass, staticClass];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mergeStyles = (data: VNodeData, staticStyle?: string, style?: any): any[] => {
  return [data.staticStyle, data.style, staticStyle, style];
};
