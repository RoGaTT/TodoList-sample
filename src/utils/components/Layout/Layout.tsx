import React, { useMemo, useState } from 'react';
import AuthContext, { AuthType } from '@/context/auth.context';
import ToDoListContext from '@/context/todo-list.context';
import classes from './Layout.module.scss';
import Header from '../Header';
import { TodoItemType } from '@/types/todo.type';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthType>();
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);

  const memoAuthContextValue = useMemo(() => ({
    auth,
    setAuth,
  }), [auth]);

  const memoTodoListContextValue = useMemo(() => ({
    todoList,
    setTodoList,
  }), [todoList]);

  return (
    <AuthContext.Provider value={memoAuthContextValue}>
      <ToDoListContext.Provider value={memoTodoListContextValue}>
        <div className={classes.root}>
          <Header />
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </ToDoListContext.Provider>
    </AuthContext.Provider>
  );
};

export default Layout;
