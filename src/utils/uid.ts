const uids = new WeakMap();

export const uid = (component: Record<string, any>): string => {
  if (uids.has(component)) {
    return uids.get(component);
  }

  uids.set(component, String(~~(Math.random() * 1000000000)));

  return uid(component);
};
