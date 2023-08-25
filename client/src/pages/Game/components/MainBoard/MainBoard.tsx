import { Typography } from "antd";
import gamesStore from "../../store/game";
import { Board } from "../../../../components/Board/Board";
import { sortDataBasedOnDevice, getId } from "./utils";

const MainBoard = () => {
  const [board, currentResult] = gamesStore(state => [state.board, state.currentResult]);

  return (
    <div>
      <Typography.Title level={3}>Main board</Typography.Title>
      <div>
        <Board
          columns={6}
          elements={sortDataBasedOnDevice(board, {
            id: getId(board, currentResult.selected.image).id,
            image: currentResult.selected.image,
            selected: true
          })}
        />
      </div>
    </div>
  );
};

export default MainBoard;
