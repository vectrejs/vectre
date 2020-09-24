export const addPrefix = (source: string, prefix = '', suffix = ''): string => {
  const prefixWithSuffix = prefix ? prefix + suffix : prefix;

  return prefixWithSuffix + source;
};
