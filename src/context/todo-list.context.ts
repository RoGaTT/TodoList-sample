import React from 'react';
import { TodoItemType } from '@/types/todo.type';

type TodoListContextType = {
  setTodoList: (todoList: TodoItemType[]) => void
  todoList: TodoItemType[]
}

const TodoListContext = React.createContext<TodoListContextType>({
  setTodoList: () => { },
  todoList: [],
});

export default TodoListContext;
