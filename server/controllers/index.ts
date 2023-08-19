import { Controllers, Dependencies } from './controllers.model';
import games from './games/games';


const start = (dependencies: Dependencies): Controllers => {
  return {
    games: games(dependencies),
  };
};

export default start;
