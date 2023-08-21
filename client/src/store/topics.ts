import { message } from 'antd';
import { create } from 'zustand';
import { getTopics } from '../api';

interface UIState {
  loading: boolean;
  topics: any[];
  findAllTopics: () => void;
}

const gamesStore = create<UIState>()((set) => ({
  loading: true,
  topics: [],
  findAllTopics: async () => {
    try {
      set({ loading: true });
      const topics: any[] = await getTopics();
      return set({ topics });
    } catch (error) {
      message.error('Error listando tus recetas');
    } finally {
      set({ loading: false });
    }
  },
}));

export default gamesStore;
