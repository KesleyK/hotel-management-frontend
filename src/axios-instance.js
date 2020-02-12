import axios from 'axios';

import { getToken } from '../src/util/jwtAuth';

const instance = axios.create({
  baseURL: 'http://localhost:8080'
});

instance.interceptors.request.use(async (instanceConfig) => {
  const token = getToken();

  if (token) {
    instanceConfig.headers.Authorization = 'Bearer ' + token
  }

  return instanceConfig;
});

export default instance;