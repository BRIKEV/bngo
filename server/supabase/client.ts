import axios from 'axios';
import config from '../config';

export const getTopics = (topics: number[], userToken: string) => {
  return axios.get(`${config.supabase.host}/rest/v1/topics`, {
    params: {
      select: '*,images(*)',
      id: `in.(${topics.join(', ')})`,
    },
    headers: {
      apikey: config.supabase.anonKey,
      Authorization: userToken,
    },
  })
};
