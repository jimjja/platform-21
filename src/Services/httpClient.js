
import axios from 'axios';

export default class HttpClient {
  constructor({ protocol = 'https://', domain }) {
    this.config = {
      protocol,
      domain,
    };
  }

  async request({ method = 'get', path, queryString = null }) {
    const url = this.buildUrl({ path, queryString });
    const res = await axios[method.toLowerCase()](url);
    return res.data || {};
  }

  buildUrl({ path, queryString }) {
    const { protocol, domain } = this.config;
    return `${protocol}${domain}${path ? `/${path}` : ''}${queryString ? `?${queryString}` : ''}`;
  }
}
