import { List, Typography } from "antd";
import gamesStore from "../../store/game";

const DrawPick = () => {
  const [currentResult, users] = gamesStore(state => [state.currentResult, state.users]);

  console.log('Re render DrawPick');
  console.log(currentResult);
  return (
    <div>
      <Typography.Title level={3}>DrawPick</Typography.Title>
      <div>
      <Typography.Title level={4}>Se muestra</Typography.Title>
      {currentResult.selected.image}
      <hr />
      <Typography.Title level={4}>Users</Typography.Title>
        <List>
          {users.map(user => (
            <List.Item key={user.username}>
              <Typography.Text>{user.username}</Typography.Text>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
};

export default DrawPick;
