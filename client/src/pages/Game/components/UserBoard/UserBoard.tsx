import { Button, Typography } from "antd";
import gamesStore from "../../store/game";
import { emit } from "../../../../io";

const UserBoard = () => {
  const [userBoard, user] = gamesStore(state => [state.userBoard, state.user]);

  console.log(userBoard, user);
  const readyToPlay = () => {
    emit('readyToStart');
  };
  return (
    <div>
      <Button type="primary" onClick={readyToPlay}>Ready to play</Button>
      <Typography.Title level={3}>UserBoard</Typography.Title>
      <div>
        {userBoard.map(board => (
          <div key={board.id}>
            {board.image}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBoard;
