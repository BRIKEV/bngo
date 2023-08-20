import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { theme as appTheme } from './styles/theme';
import router from './routes';

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
