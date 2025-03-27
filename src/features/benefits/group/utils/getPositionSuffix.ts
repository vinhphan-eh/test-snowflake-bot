export const getPositionSuffix = (position: number) => {
  if (position % 100 >= 11 && position % 100 <= 13) {
    return 'th';
  }

  switch (position % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
