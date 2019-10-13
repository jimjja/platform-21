import axios from 'axios';
import moment from 'moment';

const appKey = '2fbb429bb4a837934d8b9dc36b8bab5d';
const appId = '0132e52f';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

function getOffsetTime(dateTime) {
  const noDigits = '2-digit';
  const options = {
    hour: noDigits, minute: noDigits, second: noDigits,
  };
  const date = new Date(dateTime);
  return date.toLocaleTimeString('en-gb', options);
}

async function getTrains(date, time) {
  if (!date || !time) {
    throw new Error('Date and time are missing');
  }
  try {
    const formatedDate = moment(date).format(dateFormat);
    const formatedTime = moment(time).format(timeFormat);

    const stationCode = 'CHX';
    const fromOffset = getOffsetTime(new Date('10-10-2019 00:15:00'));
    const toOffset = getOffsetTime(new Date('10-10-2019 00:45:00'));

    const queryString = [
      `app_id=${appId}`,
      `app_key=${appKey}`,
      'train_status=passenger',
      `from_offset=PT${fromOffset}`,
      `to_offset=PT${toOffset}`,
    ];

    const result = await axios.get(
      `https://transportapi.com/v3/uk/train/station/${stationCode}/${formatedDate}/${formatedTime}/timetable.json?${queryString.join('&')}`,
    );
    console.log(result.data.departures);
    return (result.data && result.data.departures && result.data.departures.all) || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getTrains };
