import Board from '@/components/app/Board';
import gamesStore from '../../store/game';

const BngoGame = () => {
  const [board] = gamesStore(state => [
    state.board,
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="w-full lg:w-[60%] flex justify-center">
        <Board columns={7} elements={board} selectable={false} />
      </div>
    </div>
  );
};

export default BngoGame;
