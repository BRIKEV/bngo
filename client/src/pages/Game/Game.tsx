import { useEffect } from "react";
import io from "../../io";
import gamesStore from "./store/game";
import { getInfo, logout } from "../../persistence/access";
import UserBoard from "./components/UserBoard/UserBoard";
import MainBoard from "./components/MainBoard/MainBoard";
import DrawPick from "./components/DrawPick/DrawPick";
import { shallow } from "zustand/shallow";

const Game = () => {
  const methods = gamesStore((state) => ({
    setOptionSelected: state.setOptionSelected,
    setTotalBoard: state.setTotalBoard,
    setUserBoard: state.setUserBoard,
    setUserInfo: state.setUserInfo,
    setUsersList: state.setUsersList,
    activateAnimate: state.activateAnimate,
  }), shallow);
  console.log('Re render Game', methods);
  useEffect(() => {
    io({
      yourBoard: (_username, board) => methods.setUserBoard(board),
      userReady: methods.setUserInfo,
      gameReady: methods.activateAnimate,
      board: methods.setTotalBoard,
      optionSelected: methods.setOptionSelected,
      callbackAfterSelected: methods.activateAnimate,
      errorAccess: () => {
        logout();
        window.location.reload();
      },
      incorrectBingo: () => {
        console.log('Show popup with no bingo');
      },
      userMessage: () => {
        console.log('show mensajes');
      },
      userLeaves: () => {
        logout();
        window.location.reload();
      },
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
      ...getInfo(),
      delay: 6000,
    });
  }, []);

  return (
    <div>
      <MainBoard />
      <DrawPick />
      <UserBoard />
    </div>
  );
};

export default Game;
