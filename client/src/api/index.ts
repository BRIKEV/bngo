import axios from 'axios';
import { supabase } from '../supabase/client';

export const joinGame = (gameKey: string, username: string, gameName: string) => {
  return axios.post<{ accessKey: string }>('/api/v1/game/join', {
    gameKey,
    username,
    gameName,
  });
};

export const createGame = (gameKey: string, gameName: string, topics: number[]) => (
  axios.post('/api/v1/game', {
    gameKey,
    gameName,
    topics,
  })
);

const saveImage = async (topicId: number, image: File, path: string) => {
  const { data, error } = await supabase.storage.from('topics').upload(
    `${path}/${image.name}`,
    image,
  );
  const newTopicResponse = await supabase.from('images').insert({
    url: data?.path,
    topic_id: topicId,
  }).select().single();
  console.log(data, error, newTopicResponse);
};

export const createTopic = async (topicName: string, images: File[]) => {
  try {
    const userResponse = await supabase.auth.getUser();
    const userId = userResponse.data.user?.id;
    const newTopicResponse = await supabase.from('topics').insert({
      name: topicName,
      user_id: userId,
    }).select().single();
    const savedTopicId = newTopicResponse.data.id;
    const savedTopicName = newTopicResponse.data.name;
    for (const image of images) {
      await saveImage(savedTopicId, image, `${userId}/${savedTopicName}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTopic = async (topicId: number) => {
  try {
    const { data: topicResponse } = await supabase.from('topics')
      .select('*, images(*)')
      .eq('id', topicId)
      .single();
      const URLS = topicResponse.images.map(image => image.url);
      const { data: tmpUrls } = await supabase
        .storage
        .from('topics')
        .createSignedUrls(URLS, 60);
      const topic = {
        ...topicResponse,
        images: topicResponse.images.map((image, index: number) => {
          return {
            uid: image.id.toString(),
            name: image.name,
            url: tmpUrls[index].signedUrl,
          };
        })
      };
    return topic;
  } catch (error) {
    console.log(error);
  }
};

export const getTopics = async () => {
  try {
    const topicsResponse = await supabase.from('topics').select('*, images(*)');
    return topicsResponse.data;
  } catch (error) {
    console.log(error);
  }
};
