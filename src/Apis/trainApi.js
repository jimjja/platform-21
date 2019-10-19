import moment from 'moment';
import Http from '../Services/http';

const appKey = '2fbb429bb4a837934d8b9dc36b8bab5d';
const appId = '0132e52f';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';
const offsetFormat = 'HH:mm:ss';

function getOffsetTime(dateTime) {
  const noDigits = '2-digit';
  const options = {
    hour: noDigits,
    minute: noDigits,
    second: noDigits,
  };
  const date = new Date(dateTime);
  return date.toLocaleTimeString('en-gb', options);
}

export default class TrainsAPI {
  constructor() {
    this.http = new Http({
      domain: 'transportapi.com/',
    });
  }

  async getTrains(trainStation, date, time, fromOffsetTime, toOffsetTime) {
    if (!date || !time) {
      throw new Error('Date and time are missing');
    }
    try {
      const formatedDate = moment(date).format(dateFormat);
      const formatedTime = moment(time).format(timeFormat);

      const fromOffset = fromOffsetTime.format(offsetFormat);
      const toOffset = toOffsetTime.format(offsetFormat);

      const queryString = [
        `app_id=${appId}`,
        `app_key=${appKey}`,
        'train_status=passenger',
        `from_offset=PT${fromOffset}`,
        `to_offset=PT${toOffset}`,
      ];

      const result = await this.http.request({
        path: `v3/uk/train/station/${trainStation}/${formatedDate}/${formatedTime}/timetable.json`,
        queryString: queryString.join('&'),
      });

      return (
        (result && result.departures && result.departures.all)
        || []
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
