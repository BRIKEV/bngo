import { List, Tag, Typography } from "antd";
import gamesStore from "../../store/game";
import styles from './UsersList.module.css';

const UsersList = () => {
  const users = gamesStore(state => state.users);

  console.log('Re render UsersList');
  return (
    <div className={styles.container}>
      <Typography.Title level={4}>Usuarios en la partida</Typography.Title>
      <List
        dataSource={users}
        bordered
        renderItem={(user) => (
          <List.Item>
            <Typography.Text ellipsis>{user.username}</Typography.Text>
            <div className={styles.tagContainer}>
              {user.host && <Tag style={{ margin: 0 }} color="red">Admin</Tag>}
              {user.ready ? <Tag style={{ margin: 0 }} color="green">Listo</Tag> : <Tag style={{ margin: 0 }} color="default">Pendiente para empezar</Tag>}
            </div>
          </List.Item>
        )}
      >
      </List>
    </div>
  );
};

export default UsersList;
