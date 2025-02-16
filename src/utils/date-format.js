import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const dateFormatString = 'YYYY-MM-DD HH:mm:ss';

export function formatDate(date) {
  return dayjs.utc(date).format(dateFormatString);
}