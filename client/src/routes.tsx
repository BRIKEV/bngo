import { createBrowserRouter } from 'react-router-dom';
import Game from './pages/Game/Game';
import Homepage from './pages/Home/Home';
import RouteValidation from './Layout/RouteValidation';
import Admin from './pages/Admin/Admin';

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
    path: '/game',
    element: <Game />,
  },
  {
    path: '/login',
    element: <Game />,
  },
]);

export default router;
