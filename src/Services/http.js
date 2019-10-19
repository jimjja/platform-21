import HttpClient from './httpClient';
import { get, set } from './localStorage';

export default class Http {
  constructor(args) {
    this.client = new HttpClient({ ...args });
  }

  async request(args) {
    const { method = 'get', path } = args;

    if (method === 'get') {
      const cachedResult = get(path);
      if (cachedResult && cachedResult.length !== 0) {
        return Promise.resolve(cachedResult);
      }
    }

    const response = await this.client.request(args);
    set(path, response);
    return response;
  }
}
