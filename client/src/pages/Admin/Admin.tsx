import { Button, Typography } from 'antd';
import { supabase } from '../../supabase/client';
import CreateGame from './components/CreateGame/CreateGame';
import CreateTopic from './components/CreateTopic/CreateTopic';
import ListTopics from './components/ListTopics/ListTopics';
import { useEffect } from 'react';
import gamesStore from '../../store/topics';
import styles from './Admin.module.scss';

const Admin = () => {
  const findAllTopics = gamesStore((state) => state.findAllTopics);
  useEffect(() => {
    findAllTopics();
  }, [findAllTopics]);
  return (
    <div className={styles.container}>
      <Typography.Title>Crear juego</Typography.Title>
      <CreateGame />
      <hr />
      <Typography.Title level={2}>Crear categorias</Typography.Title>
      <CreateTopic />
      <hr />
      <Typography.Title level={2}>Tus categorias</Typography.Title>
      <ListTopics />
      <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
    </div>
  );
};

export default Admin;
