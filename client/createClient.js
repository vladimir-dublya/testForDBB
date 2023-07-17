import axios from 'axios';
import config from '../config/config';

export function createClient() {
  return axios.create({
    baseURL: config.baseURL,
  });
}
