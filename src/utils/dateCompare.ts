export const dateCompare = (shouldBeCompletedAt: Date) => {
  const date2 = new Date().toLocaleDateString();

  const shouldBeCompletedAtDate = new Date(shouldBeCompletedAt);
  shouldBeCompletedAtDate.setDate(shouldBeCompletedAtDate.getDate() + 1);

  const date1 = shouldBeCompletedAtDate.toLocaleDateString();

  const date1Array = date1.split('/');
  const date2Array = date2.split('/');
  const date1Day = parseInt(date1Array[0]);
  const date1Month = parseInt(date1Array[1]);
  const date1Year = parseInt(date1Array[2]);
  const date2Day = parseInt(date2Array[0]);
  const date2Month = parseInt(date2Array[1]);
  const date2Year = parseInt(date2Array[2]);

  if (
    date1Day === date2Day + 1 &&
    date1Month === date2Month &&
    date1Year === date2Year
  ) {
    return 2; // um dia após - amanha
  }
  if (date1Year < date2Year) {
    return 0; // ano é menor - passado
  }
  if (date1Year > date2Year) {
    return 3; // ano é maior - futuro
  }
  if (date1Month < date2Month) {
    return 0; // mes é menor - passado
  }
  if (date1Month > date2Month) {
    return 3; // mes é maior - futuro
  }
  if (date1Day < date2Day) {
    return 0; // dia é menor - passado
  }
  if (date1Day > date2Day) {
    return 3; // dia é maior - futuro
  }

  return 1;
};
