import gamesStore from "../../store/game";
import RouletteComponent from "../../../../components/Wheel/Wheel";
import UsersList from "../UsersList/UsersList";
import styles from './DrawPick.module.css';

const DrawPick = () => {
  const [currentResult, board, gameReady] = gamesStore(state => [
    state.currentResult,
    state.board,
    state.gameReady,
  ]);

  console.log('Re render DrawPick');
  console.log(currentResult);
  return (
    <div>
      {gameReady && (
        <div >
          <RouletteComponent
            animate={!!currentResult.animate}
            selected={currentResult.selected}
            images={board}
          />
        </div>
      )}
      {!gameReady && (
        <UsersList />
      )}
    </div>
  );
};

export default DrawPick;
