import axios from 'axios';
import { supabase } from '../supabase/client';

export const joinGame = (gameKey: string, username: string, gameName: string) => {
  return axios.post<{ accessKey: string }>('/api/v1/games/join', {
    gameKey,
    username,
    gameName,
  });
};
export const createGame = async (gameKey: string, gameName: string, topics: number[]) => {
  const { data: session } = await supabase.auth.getSession();
  return axios.post('/api/v1/games', {
    gameKey,
    gameName,
    topics,
  }, {
    headers: {
      Authorization: `Bearer ${session.session?.access_token}`,
    },
  })
};

export const saveImage = async (topicId: number, image: File, userId: string) => {
  const imagePath = `${userId}/${topicId}/${image.name}`;
  const { data: imageUploaded } = await supabase.storage.from('topics').upload(
    imagePath,
    image,
    {
      contentType: image.type,
      upsert: false,
    },
  );
  const { data } = await supabase
    .storage
    .from('topics')
    .list(`${userId}/${topicId}`, {
      limit: 1,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
  if (!data) throw Error('Uploading images');
  const storageId = data[0].id;
  await supabase.from('images').insert({
    url: imageUploaded?.path as string,
    topic_id: topicId,
    storage_id: storageId,
  }).select().single();
};

export const createTopic = async (topicName: string, images: File[]) => {
  try {
    const userResponse = await supabase.auth.getUser();
    const userId = userResponse.data.user?.id;
    if (!userId) throw Error('User must be authenticated');
    const newTopicResponse = await supabase.from('topics').insert({
      name: topicName,
      user_id: userId,
    }).select().single();
    if (!newTopicResponse.data) throw Error('Error creating topic');
    const savedTopicId = newTopicResponse.data.id;
    for (const image of images) {
      await saveImage(savedTopicId, image, userId as string);
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
    if (!topicResponse) throw Error('Error creating topic');
    const URLS = topicResponse.images.map(image => image.url);
    const { data: tmpUrls } = await supabase
      .storage
      .from('topics')
      .createSignedUrls(URLS, 60);
    if (!tmpUrls) throw Error('Error creating signed urls');
    const topic = {
      ...topicResponse,
      images: topicResponse.images.map((image, index: number) => {
        const name = image.url.split('/').at(-1);
        return {
          uid: image.id.toString(),
          url: tmpUrls[index].signedUrl,
          name,
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
    if (!topicsResponse.data) throw Error('Error geting topics');
    return topicsResponse.data;
  } catch (error) {
    console.log(error);
  }
};
