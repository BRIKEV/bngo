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
