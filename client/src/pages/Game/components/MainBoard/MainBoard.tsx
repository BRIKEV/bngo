import { Typography } from "antd";
import gamesStore from "../../store/game";
import { Board } from "../../../../components/Board/Board";

const MainBoard = () => {
  const [board] = gamesStore(state => [
    state.board,
  ]);

  return (
    <div>
      <Typography.Title level={3}>Main board</Typography.Title>
      <div>
        <Board
          columns={6}
          elements={board}
        />
      </div>
    </div>
  );
};

export default MainBoard;
