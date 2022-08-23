export const dateCompare = (date1: string, date2: string) => {
  const date1Array = date1.split('/');
  const date2Array = date2.split('/');
  const date1Day = parseInt(date1Array[0]);
  const date1Month = parseInt(date1Array[1]);
  const date1Year = parseInt(date1Array[2]);
  const date2Day = parseInt(date2Array[0]);
  const date2Month = parseInt(date2Array[1]);
  const date2Year = parseInt(date2Array[2]);
  if (date1Year < date2Year) {
    return 0;
  }
  if (date1Year > date2Year) {
    return 3;
  }
  if (date1Month < date2Month) {
    return 0;
  }
  if (date1Month > date2Month) {
    return 3;
  }
  if (date1Day < date2Day) {
    return 0;
  }
  if (date1Day > date2Day) {
    return 3;
  }
  return 1;
};
