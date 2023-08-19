import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login/Login';
import Homepage from './pages/Home/Home';
import { theme as appTheme } from './styles/theme';
import RouteValidation from './Layout/RouteValidation';

const router = createBrowserRouter([
  {
    path: '/admin',
    element: (
      <RouteValidation>
        <Homepage />
      </RouteValidation>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: appTheme.mainColor,
            colorText: appTheme.textColor,
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
)
