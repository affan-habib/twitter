import moment from 'moment';

export default function formatDateAndTime(timestamp) {
  const messageDate = moment(timestamp);

  if (!messageDate.isValid()) {
    return 'Invalid';
  }

  const currentDate = moment();

  if (currentDate.diff(messageDate, 'days') === 0) {
    const hoursDifference = currentDate.diff(messageDate, 'hours');
    if (hoursDifference < 3) {
      return messageDate.fromNow();
    } else {
      return messageDate.format('h:mm A');
    }
  } else if (currentDate.diff(messageDate, 'days') === 1) {
    return 'Yesterday';
  } else {
    return messageDate.format('D MMM YYYY');
  }
}
