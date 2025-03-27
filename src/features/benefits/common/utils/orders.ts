export const removeSpecialCharacters = (str: string) => str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>]/gi, ' ');
export const removeRedundantSpace = (str: string) => str.replace(/\s+/g, ' ').trim();
