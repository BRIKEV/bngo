import { Button, Typography } from "antd";
import gamesStore from "../../store/game";
import { emit } from "../../../../io";
import { Board } from "../../../../components/Board/Board";

const UserBoard = () => {
  const [userBoard] = gamesStore(state => [state.userBoard]);

  console.log('Re render UserBoard');
  console.log(userBoard);
  const readyToPlay = () => {
    emit('readyToStart');
  };
  const leaveGame = () => {
    emit('leaveUser');
  };
  return (
    <div>
      <Button type="primary" onClick={readyToPlay}>Ready to play</Button>
      <Button type="primary" onClick={leaveGame}>Leave game</Button>
      <Typography.Title level={3}>UserBoard</Typography.Title>
      <div>
      <Board
        columns={4}
        elements={userBoard.map(item => ({
          ...item,
          selected: true
        }))}
      />
      </div>
    </div>
  );
};

export default UserBoard;
