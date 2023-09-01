import { Typography } from 'antd';
import gamesStore from '../../store/game';
import { Board } from '../../../../components/Board/Board';
import { isMobileDevice } from '../../store/utils';

const MainBoard = () => {
  const [board, currentResults] = gamesStore(state => [
    state.board,
    state.currentResults,
  ]);

  return (
    <div>
      <Typography.Title level={3}>Main board</Typography.Title>
      <div>
        <Board
          selectable={false}
          columns={6}
          elements={isMobileDevice() && currentResults.length > 0 ? currentResults: board}
        />
      </div>
    </div>
  );
};

export default MainBoard;
