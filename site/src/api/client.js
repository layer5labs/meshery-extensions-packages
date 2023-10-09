import Axios from 'axios';

export const BASE_URL = process.env.BASE_URL;
export const client = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Cache-Control': 'private',
  },
});
