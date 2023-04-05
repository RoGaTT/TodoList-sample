import React, {
  PropsWithChildren, useContext, useMemo, useState,
} from 'react';
import { TodoType } from '@/types/todo.type';

type TodoListContextType = {
  setTodoList: (todoList: TodoType[]) => void
  todoList: TodoType[]
}

const TodoListContext = React.createContext<TodoListContextType>({
  setTodoList: () => { },
  todoList: [],
});

export const TodoListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const memoTodoListContextValue = useMemo(() => ({
    todoList,
    setTodoList,
  }), [todoList]);

  return (
    <TodoListContext.Provider value={memoTodoListContextValue}>
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = (): TodoListContextType => {
  const todoListContext = useContext(TodoListContext);

  return todoListContext;
};
