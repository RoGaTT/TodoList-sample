import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ROUTES_CONFIG from './const/routes.config';

import '@/assets/styles/index.scss';
import { UserProvider } from './context/user.context';
import { DatabaseProvider } from './context/database.context';
import { TodoListProvider } from './context/todo-list.context';

const Root: React.FC = () => (
  <DatabaseProvider>
    <UserProvider>
      <TodoListProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TodoListProvider>
    </UserProvider>
  </DatabaseProvider>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
