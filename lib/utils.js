/**
 * convert a timestamp to a humanreadable string.
 * @param {string} timestamp datetime timestamp
 */
export function getDateStringFromTimestamp(timestamp) {
  const date = new Date(timestamp);

  return date.toLocaleString({
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
