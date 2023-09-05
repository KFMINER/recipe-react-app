/**
 * A hook to convert a timestamp in seconds (since 01.01.1970) to a Date object or formatted string.
 * @returns getDateFromSeconds(), getDateFromSecondsFormatted()
 * @author Kevin Friedrichs
 */
const useDate = () => {

  const getDateFromSeconds = (seconds?: number) => {
    if (seconds) {
      const date = new Date(0);
      date.setSeconds(seconds);
      return date;
    }
    return null;
  }

  const getDateFromSecondsFormatted = (seconds?: number) => {
    const date = getDateFromSeconds(seconds);
    if (date) {
      return date.toLocaleDateString('de-DE');
    }
    return "";
  }

  return {getDateFromSeconds, getDateFromSecondsFormatted};
}

export default useDate;