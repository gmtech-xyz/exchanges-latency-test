export const avg = (arr: number[]) =>
  arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

export const min = (arr: number[]) => (arr.length ? Math.min(...arr) : 0);
export const max = (arr: number[]) => (arr.length ? Math.max(...arr) : 0);
