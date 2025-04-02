import { message } from 'antd';
import { create } from 'zustand';
import { getTopics } from '../api';

interface Topic {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
  user_id: string;
  images: {
      created_at: string;
      id: number;
      storage_id: string;
      topic_id: number;
      updated_at: string;
      url: string;
  }[];
}

interface UIState {
  loading: boolean;
  topics: Topic[];
  findAllTopics: () => void;
}

const gamesStore = create<UIState>((set) => ({
  loading: true,
  topics: [],
  findAllTopics: async () => {
    try {
      set({ loading: true });
      const topics = await getTopics();
      return set({ topics });
    } catch (error) {
      message.error('Error listando tus recetas');
    } finally {
      set({ loading: false });
    }
  },
}));

export default gamesStore;
