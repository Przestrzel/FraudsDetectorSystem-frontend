export const capitalizeFirstLetter = (str: string) => {
  if(!str) return '';
  const lower = str.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};