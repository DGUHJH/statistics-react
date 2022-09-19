import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'pages/Main';
import 'antd/dist/antd.css';
import './default.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />} />
    </Routes>
  </BrowserRouter>
);
