import { Button, Typography } from 'antd';
import gamesStore from '../../store/game';
import { emit } from '../../../../io';
import { Board } from '../../../../components/Board/Board';
import styles from './UserBoard.module.scss';

const UserBoard = () => {
  const [userBoard, gameReady] = gamesStore(state => [state.userBoard, state.gameReady]);

  const haveBngo = () => {
    emit('bingo');
  };

  const readyToPlay = () => {
    emit('readyToStart');
  };

  const leaveGame = () => {
    emit('leaveUser');
  };

  return (
    <div className={styles.container}>
      {gameReady ? (
        <div className={styles.buttonContainer}>
          <Button type="primary" block onClick={haveBngo}>Bngo</Button>
        </div>
      ): (
        <div className={styles.buttonContainer}>
          <Button type="primary" block onClick={readyToPlay}>Ready to play</Button>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <Button block onClick={leaveGame}>Leave game</Button>
      </div>
      <Typography.Title level={3}>Tu tablero</Typography.Title>
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
