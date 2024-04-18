/**
 * prettyDate parses a date from string and displays it in human readable format.
 * @param time date as Go string
 */
export const prettyDate = (time: string | Date | number) => {
  let date: number;
  switch (typeof time) {
    case "string":
      date = Date.parse(time);
      break;
    case "number":
      date = time;
      break;
    default:
      date = time.getTime() / 1000;
      break;
  }
  const diff = (Date.now() - date) / 1000;
  const day_diff = Math.floor(diff / 86400);

  if (diff < 0) {
    return new Date(date);
  }

  return (
    (day_diff === 0 &&
      ((diff < 60 && "just now") ||
        (diff < 120 && "1 minute ago") ||
        (diff < 3600 && `${Math.floor(diff / 60)} minutes ago`) ||
        (diff < 7200 && "1 hour ago") ||
        (diff < 86400 && `${Math.floor(diff / 3600)} hours ago`))) ||
    (day_diff === 1 && "Yesterday") ||
    (day_diff < 7 && `${day_diff} days ago`) ||
    (day_diff < 14 && "1 week ago") ||
    (day_diff < 31 && `${Math.floor(day_diff / 7)} weeks ago`) ||
    new Date(date)
  );
};
