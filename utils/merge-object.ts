export const mergeObject = (obj1: Record<string, any>, obj2: Record<string, any>) => {
  const mergedObject = { ...obj1 };

  for (let [key, value] of Object.entries(obj2)) {
    if (value !== undefined) {
      mergedObject[key] = value;
    }
  }

  return mergedObject;
}