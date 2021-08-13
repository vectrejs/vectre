export const mergeCss = (
  data: Record<string, unknown>,
  staticClass?: string,
  cssClass?: Record<string, unknown> | string[] | string,
): any[] => {
  return [data.class, data.staticClass, cssClass, staticClass];
};

export const mergeStyles = (
  data: Record<string, unknown>,
  staticStyle?: string,
  style?: Record<string, unknown> | string[] | string,
): any[] => {
  return [data.staticStyle, data.style, staticStyle, style];
};
