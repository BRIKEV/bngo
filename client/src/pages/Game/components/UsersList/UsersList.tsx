import { List, Tag, Typography } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import gamesStore from "../../store/game";

const UsersList = () => {
  const users = gamesStore(state => state.users);

  console.log('Re render UsersList');
  return (
    <div>
      <Typography.Title level={4}>Users</Typography.Title>
      <List>
        {users.map(user => (
          <List.Item key={user.username}>
            <Typography.Text>{user.username}</Typography.Text>
            <div>
              {user.host && <Tag color="red">Admin</Tag>}
              {user.ready ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default UsersList;
