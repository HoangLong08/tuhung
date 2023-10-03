export const removeEmptyProperties = (obj: any) => {
  const cleanedParams = new URLSearchParams();

  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      cleanedParams.append(key, obj[key]);
    }
  }

  return cleanedParams.toString();
};
