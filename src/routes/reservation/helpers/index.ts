import { formatInTimeZone } from "date-fns-tz";
import { it } from "date-fns/locale/it";

const TIME_ZONE = "Europe/Rome";

//helper function that convert the date into specific time_zone
//default time_zone is Rome
export function handleParsingDate(date: string): Date | null {
  try {
    const parsedDate = formatInTimeZone(
      new Date(date),
      TIME_ZONE,
      "yyyy-MM-dd'T'HH:mm:ss'Z'",
      { locale: it }
    );
    return new Date(parsedDate);
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
}

//check if the specified time is valid for making a reservation
export function handleTime(date: Date) {
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  if(hours < 19) return false
  if(hours >= 23 && minutes >= 1) return false
  return true;
}

//logic to check if the number of guests is < 20 for a specific date and time
export function isValidReservation(
  date: Date,
  reservationList: { date: Date; guest: number }[] | [],
  guest: number
): boolean {
  if (!handleTime(date)) return false;
  let numOfGuest = reservationList.reduce((prev, curr) => prev += curr.guest, 0);
  return numOfGuest + guest <= 20;
}
