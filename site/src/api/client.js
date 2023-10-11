import Axios from 'axios';

export const BASE_URL =
  process.env.LEADERBOARD_BASE_URL ||
  //   'https://crossorigin.me/https://discuss.layer5.io';
  'https://corsproxy.io/?https://discuss.layer5.io';

// "proxy": "https://discuss.layer5.io/"
export const client = Axios.create({
  baseURL: BASE_URL,
  headers: {
    'Cache-Control': 'private',
  },
});
