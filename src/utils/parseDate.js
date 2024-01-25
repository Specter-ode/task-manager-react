export const parseDate = dateString => {
  const parts = dateString.split('-');

  const year = +parts[0];
  const month = +parts[1];
  const day = +parts[2];
  return { year, month, day };
};
