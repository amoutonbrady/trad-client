export const prevent = (cb?: (e: Event) => unknown) => (e: Event) => {
  e.preventDefault();
  if (cb) cb(e);
};
