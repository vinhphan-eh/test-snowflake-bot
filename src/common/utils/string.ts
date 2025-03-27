export const humanize = (str: string): string => {
  return str.replace(/[_\-\s]+/g, ' ').trim();
};

export const stringAsId = (str: string): string => {
  return str.replace(/[\n\r\s\t]+/g, '-').trim();
};

export const capitalize = (str: string) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
};
