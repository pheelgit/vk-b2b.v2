import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from 'react-query'

import { ConfigProvider } from 'antd'
import ru_RU from 'antd/locale/ru_RU'

import 'dayjs/locale/ru'

import App from './app/App'
import './index.css'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ru_RU}>
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
