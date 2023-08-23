import { useEffect } from "react";
import io from "../../io";
import gamesStore from "./store/game";
import { getInfo, logout } from "../../persistence/access";
import UserBoard from "./components/UserBoard/UserBoard";
import MainBoard from "./components/MainBoard/MainBoard";
import DrawPick from "./components/DrawPick/DrawPick";
import { shallow } from "zustand/shallow";
import { message } from "antd";

const Game = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const methods = gamesStore((state) => ({
    setOptionSelected: state.setOptionSelected,
    setTotalBoard: state.setTotalBoard,
    setUserBoard: state.setUserBoard,
    setUserInfo: state.setUserInfo,
    setUsersList: state.setUsersList,
    activateAnimate: state.activateAnimate,
    startGame: state.startGame,
    usernameHasBingo: state.usernameHasBingo,
  }), shallow);
  console.log('Re render Game', methods);
  useEffect(() => {
    io({
      yourBoard: (_username, board) => methods.setUserBoard(board),
      userReady: methods.setUserInfo,
      gameReady: methods.startGame,
      board: methods.setTotalBoard,
      optionSelected: methods.setOptionSelected,
      callbackAfterSelected: methods.activateAnimate,
      errorAccess: () => {
        logout();
        window.location.reload();
      },
      incorrectBingo: () => {
        messageApi.open({
          type: 'warning',
          content: 'No tienes bingo',
        });
      },
      userMessage: () => {
        console.log('show mensajes');
      },
      userLeaves: () => {
        logout();
        window.location.reload();
      },
      usernameHasBingo: methods.usernameHasBingo,
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
      {contextHolder}
    </div>
  );
};

export default Game;
