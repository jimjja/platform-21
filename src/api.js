import axios from 'axios';
import moment from 'moment';

const appKey = '2fbb429bb4a837934d8b9dc36b8bab5d';
const appId = '0132e52f';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

async function getTrains(date, time) {
  if (!date || !time) {
    throw new Error('Date and time are missing');
  }
  try {
    const formatedDate = moment(date).format(dateFormat);
    const formatedTime = moment(time).format(timeFormat);

    const result = await axios.get(
      `https://transportapi.com/v3/uk/train/station/CHX/${formatedDate}/${formatedTime}/timetable.json?app_id=${appId}&app_key=${appKey}&train_status=passenger`,
    );
    console.log(result.data.departures);
    return result.data && result.data.departures && result.data.departures.all || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { getTrains };
