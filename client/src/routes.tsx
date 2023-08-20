import { createBrowserRouter } from 'react-router-dom';
import Game from './pages/Game/Game';
import Homepage from './pages/Home/Home';
import RouteValidation from './Layout/RouteValidation';
import Admin from './pages/Admin/Home';

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
]);

export default router;
