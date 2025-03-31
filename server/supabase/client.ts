import axios from 'axios';
import config from '../config';
import { internalError } from '../utils/errorFactory';
import { path } from 'ramda';

interface SignedURLS {
  error: string;
  path: string;
  signedURL: string;
}

const mockedSignedURLS = [
  {
    error: null,
    path: 'path/to/image1.jpg',
    signedURL: 'https://example.com/signed-url1',
  },
  {
    error: null,
    path: 'path/to/image2.jpg',
    signedURL: 'https://example.com/signed-url2',
  },
]; 

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

const mockedTopics = [
  {
    id: 1,
    created_at: '2023-10-01T00:00:00Z',
    updated_at: '2023-10-01T00:00:00Z',
    name: 'Topic 1',
    user_id: 'user-1',
    images: [
      {
        id: 1,
        created_at: '2023-10-01T00:00:00Z',
        updated_at: '2023-10-01T00:00:00Z',
        url: 'https://example.com/image1.jpg',
        topic_id: 1,
        storage_id: 'storage-1',
      },
      {
        id: 2,
        created_at: '2023-10-01T00:00:00Z',
        updated_at: '2023-10-01T00:00:00Z',
        url: 'https://example.com/image2.jpg',
        topic_id: 1,
        storage_id: 'storage-2',
      },
    ],
  },
];

export const getTopics = async (topics: number[], userToken: string): Promise<Topic[]> => {
  const { data } = await axios.get<Topic[]>(`${config.supabase.host}/rest/v1/topics`, {
    params: {
      select: '*,images(*)',
      id: `in.(${topics.join(', ')})`,
    },
    headers: {
      apikey: config.supabase.anonKey,
      Authorization: userToken,
    },
  });
  return data;
};
