import React from 'react'
import ReactDOM from 'react-dom/client'

import { ConfigProvider } from 'antd'
import ru_RU from 'antd/locale/ru_RU'

import 'dayjs/locale/ru'

import App from './app/App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ConfigProvider locale={ru_RU}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
