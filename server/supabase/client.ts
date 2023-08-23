import axios from 'axios';
import config from '../config';
import { internalError } from '../utils/errorFactory';

interface SignedURLS {
  error: string;
  path: string;
  signedURL: string;
}

export const createPreSignedURLS = async (userToken: string, paths: string[], expiresIn = 60) => {
  const { data } = await axios.post<SignedURLS[]>(`${config.supabase.host}/storage/v1/object/sign/topics`, {
    expiresIn,
    paths,
  }, {
    headers: {
      apikey: config.supabase.anonKey,
      Authorization: userToken,
    },
  });
  if (!data) throw internalError('Error retrieving images');
  return data.map(images => ({
    ...images,
    signedUrl: `${config.supabase.host}/storage/v1${images.signedURL}`
  }));
};


interface Topic {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  user_id: string;
  images: {
    id: number;
    created_at: string;
    updated_at: string;
    url: string;
    topic_id: number;
    storage_id: string;
  }[]
}

export const getTopics = (topics: number[], userToken: string) => {
  return axios.get<Topic[]>(`${config.supabase.host}/rest/v1/topics`, {
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
