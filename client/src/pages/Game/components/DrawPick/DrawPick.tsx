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

  return (
    <div>
      {gameReady && (
        <div className={styles.container}>
          <RouletteComponent
            animate={currentResult.animate === null || currentResult.animate}
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
