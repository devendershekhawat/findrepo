import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme, Layout } from 'antd';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
        }}>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Content>
                    <App />
                </Layout.Content>
            </Layout>
        </ConfigProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
