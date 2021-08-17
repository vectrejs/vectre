/* eslint-disable @typescript-eslint/ban-types */
export const flattenListener = (listener?: Function | Function[]): ((event: any) => void) => {
  let flatten: Function[];
  if (listener) {
    flatten = Array.isArray(listener) ? listener : [listener];
  } else {
    flatten = [];
  }

  return (event: any): void => flatten.forEach((l) => l && l(event));
};
