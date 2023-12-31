import { createBrowserRouter } from 'react-router-dom';
import Game from './pages/Game/Game';
import Homepage from './pages/Home/Home';
import RouteValidation from './Layout/RouteValidation';
import Admin from './pages/Admin/Admin';
import TopicDetail from './pages/TopicDetail/TopicDetail';
import GameValidation from './Layout/GameValidation';
import Login from './pages/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Homepage />
    ),
  },
  {
    path: '/admin',
    element: (
      <RouteValidation>
        <Admin />
      </RouteValidation>
    ),
  },
  {
    path: '/admin/topics/:id',
    element: (
      <RouteValidation>
        <TopicDetail />
      </RouteValidation>
    ),
  },
  {
    path: '/game',
    element: (
      <GameValidation>
        <Game />
      </GameValidation>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
