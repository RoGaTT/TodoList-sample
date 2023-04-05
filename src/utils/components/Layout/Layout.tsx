import React, { useMemo, useState } from 'react';
import { UserProvider, useUser } from '@/context/user.context';
import { TodoListProvider } from '@/context/todo-list.context';
import classes from './Layout.module.scss';
import Header from '../Header';
import { TodoType } from '@/types/todo.type';
import { UserType } from '@/types/user.type';
import { DatabaseProvider } from '@/context/database.context';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  console.log(user);

  return (

    <div className={classes.root}>
      {user && <Header />}
      <div className={classes.content}>
        {children}
      </div>
    </div>

  );
};

export default Layout;
