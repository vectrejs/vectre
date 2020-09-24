export const capitalize = (s: string): string => {
  if (typeof s !== 'string') {
    throw new TypeError(`Argument should be a string. Given: ${typeof s}`);
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const uncapitalize = (s: string): string => {
  if (typeof s !== 'string') {
    throw new TypeError(`Argument should be a string. Given: ${typeof s}`);
  }

  return s.charAt(0).toLowerCase() + s.slice(1);
};
