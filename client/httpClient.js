import { createClient } from './createClient';
import config from '../config/config';

export const httpClient = createClient();

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use((res) => res.data);

function onRequest(request: any): any {
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    request.headers.authorization = `Bearer ${config.accessToken}`;
  }

  return request;
}
