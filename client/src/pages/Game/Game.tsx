import { useEffect } from "react";
import io from "../../io";
import gamesStore from "./store/game";

const Game = () => {
  const methods = gamesStore((state) => ({
    setOptionSelected: state.setOptionSelected,
    setTotalBoard: state.setTotalBoard,
    setUserBoard: state.setUserBoard,
    setUserInfo: state.setUserInfo,
    setUsersList: state.setUsersList,
    activateAnimate: state.activateAnimate,
  }));
  useEffect(() => {
    io({
      yourBoard: (_username, board) => methods.setUserBoard(board),
      userReady: methods.setUserInfo,
      gameReady: methods.activateAnimate,
      board: methods.setTotalBoard,
      optionSelected: methods.setOptionSelected,
      callbackAfterSelected: methods.activateAnimate,
      errorAccess: () => console.log('Logout'),
      incorrectBingo: () => {
        console.log('Show popup with no bingo');
      },
      userMessage: () => {
        console.log('show mensajes');
      },
      userLeaves: () => console.log('User leaves'),
      usernameHasBingo: () => {
        console.log('Mostrar ganador');
      },
      usersList: methods.setUsersList,
      readyToPlayAgain: () => {
        // removeSessionStorage();
        window.location.reload();
      },
    },
    {
      accessKey: '???',
      delay: 6000,
    });
  }, [methods]);

  return (
    <div>
      <h1>Game</h1>
    </div>
  );
};

export default Game;
