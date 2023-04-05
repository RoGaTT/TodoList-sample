/* eslint-disable react/no-array-index-key */
import React, {
  useCallback, useMemo, useRef, useState,
} from 'react';
import clsx from 'clsx';
import Container from '@/utils/components/Container';
import classes from './Home.module.scss';
import { TodoType } from '@/types/todo.type';
import { useApi } from '@/api';
import TodoItem from '@/components/TodoItem';
import { useUser } from '@/context/user.context';

const Home = () => {
  const [page, setPage] = useState<number>(0);

  const todoTextInputRef = useRef<HTMLTextAreaElement>(null);

  const api = useApi();

  const memoOnSubmit = useCallback(onSubmit, [api]);
  const memoTodoList = useMemo(() => api.getTodoList(), [api]);

  return (
    <Container>
      <div className={classes.root}>
        <form action="" onSubmit={memoOnSubmit}>
          <textarea rows={4} placeholder="Enter text" ref={todoTextInputRef} />
          <button type="submit">Add</button>
        </form>
        <div className={classes.content}>
          {
            memoTodoList.slice(page * 10, (page + 1) * 10).map((todoItem) => (
              <TodoItem key={todoItem._id} data={todoItem} level={0} />
            ))
          }
        </div>
        <div className={classes.pagination}>
          {
            new Array(Math.ceil(memoTodoList.length / 10)).fill(null).map((_, digitIndex) => (
              <button key={digitIndex} type="button" className={clsx({ [classes.isActive]: page === digitIndex })} onClick={() => setPage(digitIndex)}>{digitIndex + 1}</button>
            ))
          }
        </div>
      </div>
    </Container>
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (todoTextInputRef.current?.value) {
      api.createTodo({
        level: 0,
        text: todoTextInputRef.current?.value || '',
      });
      todoTextInputRef.current.value = '';
    }
  }
};

export default Home;
