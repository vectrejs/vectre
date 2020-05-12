import { capitalize } from './string';

export const addPrefix = (source: string, prefix = '', suffix = ''): string => {
  const prefixWithSuffix = prefix ? prefix + suffix : prefix;

  return prefixWithSuffix + capitalize(source);
};
