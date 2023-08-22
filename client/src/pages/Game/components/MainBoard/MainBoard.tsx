import { Typography } from "antd";
import gamesStore from "../../store/game";

const MainBoard = () => {
  const board = gamesStore(state => state.board);

  console.log(board);
  return (
    <div>
      <Typography.Title level={3}>Main board</Typography.Title>
      <div>
        {board.map(board => (
          <div key={board.id}>
            {board.image}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainBoard;
