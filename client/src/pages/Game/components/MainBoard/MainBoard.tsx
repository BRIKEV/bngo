import { Typography } from "antd";
import gamesStore from "../../store/game";
import { Board } from "../../../../components/Board/Board";
import { sortDataBasedOnDevice, getId } from "./utils";

const MainBoard = () => {
  const [board, currentResult] = gamesStore(state => [state.board, state.currentResult]);

  let orderedBoard = board;
  if (currentResult.selected.image) {
    orderedBoard = sortDataBasedOnDevice(board, {
      id: getId(board, currentResult.selected.image).id,
      image: currentResult.selected.image,
      selected: true
    })
  }

  return (
    <div>
      <Typography.Title level={3}>Main board</Typography.Title>
      <div>
        <Board
          columns={6}
          elements={orderedBoard}
        />
      </div>
    </div>
  );
};

export default MainBoard;
