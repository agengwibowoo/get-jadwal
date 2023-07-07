import axios from 'axios';

const BASE_URL = 'https://getjadwal.api.devcode.gethired.id/';

const api = axios.create({
  baseURL: BASE_URL,
});

export const get = (url, config) => api.get(url, config);
export const post = (url, data, config) => api.post(url, data, config);
export const put = (url, data, config) => api.put(url, data, config);
export const del = (url, config) => api.delete(url, config);
export const patch = (url, data, config) => api.patch(url, data, config);

export default api;
