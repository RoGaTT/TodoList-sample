import React, {
  PropsWithChildren, useContext, useEffect, useMemo, useState,
} from 'react';
import { TodoModel } from '@/types/todo.type';
import { ID } from '@/utils/types/model.type';
import { UserModel } from '@/types/user.type';

type DatabaseType = {
  users: Record<ID, UserModel>,
  todos: Record<ID, TodoModel>
}

type DatabaseContextType = {
  database: DatabaseType,
  setDatabase: (database: DatabaseType) => void
}

const getInitialDatabaseData = (): DatabaseType => {
  const localStorageData = localStorage.getItem('database');

  if (!localStorageData) {
    return {
      users: {},
      todos: {},
    };
  }

  const data = JSON.parse(localStorageData) as DatabaseType;

  return {
    ...data,
    todos: {
      ...Object.values(data.todos).reduce<Record<ID, TodoModel>>((accum, todo) => ({
        ...accum,
        [todo._id]: {
          ...todo,
          history: todo.history.map((historyItem) => ({ ...historyItem, createdAt: new Date(historyItem.createdAt) })),
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        },
      }), {}),

    },
  };
};

const DatabaseContext = React.createContext<DatabaseContextType>({
  database: getInitialDatabaseData(),
  setDatabase: () => { },
});

export const DatabaseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [database, setDatabase] = useState<DatabaseType>(getInitialDatabaseData());

  const memoDatabaseContextValue = useMemo(() => ({
    database,
    setDatabase,
  }), [database]);

  useEffect(() => {
    if (database) localStorage.setItem('database', JSON.stringify(database));
  }, [database]);

  return (
    <DatabaseContext.Provider value={memoDatabaseContextValue}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const databaseContext = useContext(DatabaseContext);
  return databaseContext;
};
