export const getCurrentPathName = (str: string) => {
  const regex = /^\/([^/]+)/;
  const match = str.match(regex);
  return match ? match[1] : '';
};
