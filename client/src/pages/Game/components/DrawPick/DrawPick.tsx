import { Typography } from "antd";
import gamesStore from "../../store/game";
import RouletteComponent from "../../../../components/Wheel/Wheel";
import UsersList from "../UsersList/UsersList";

const DrawPick = () => {
  const [currentResult, board] = gamesStore(state => [
    state.currentResult,
    state.board,
  ]);

  console.log('Re render DrawPick');
  console.log(currentResult);
  return (
    <div>
      <Typography.Title level={3}>DrawPick</Typography.Title>
      <div>
      <Typography.Title level={4}>Se muestra</Typography.Title>
      <div className="container-roulette">
        <RouletteComponent
          animate={!!currentResult.animate}
          selected={currentResult.selected}
          images={board}
        />
      </div>
      <hr />
      <UsersList />
      </div>
    </div>
  );
};

export default DrawPick;
