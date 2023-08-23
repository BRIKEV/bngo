import { Typography } from "antd";
import gamesStore from "../../store/game";

const MainBoard = () => {
  const board = gamesStore(state => state.board);

  console.log('Re render MainBoard');
  console.log(board);
  return (
    <div>
      <Typography.Title level={3}>Main board</Typography.Title>
      <div>
        {board.map(board => (
          <div key={board.id}>
            <Typography.Text>{board.image}</Typography.Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainBoard;
