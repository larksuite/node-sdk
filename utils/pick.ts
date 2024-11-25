export const pick = <T, K extends keyof T>(obj?: T, keys: K[] = []): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  
  if (!obj) {
    return result;
  }

  keys.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  });
  return result;
}