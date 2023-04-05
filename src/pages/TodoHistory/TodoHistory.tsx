import React, {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import Container from '@/utils/components/Container';
import classes from './TodoHistory.module.scss';
import { TodoType } from '@/types/todo.type';
import { useApi } from '@/api';
import { ID } from '@/utils/types/model.type';

type IParams = {
  id: ID
}

const TodoHistory = () => {
  const params = useParams<IParams>();
  const [page, setPage] = useState<number>(0);

  const api = useApi();

  const memoTodo = useMemo(() => api.getTodoById(params.id), [api, params.id]);

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.list}>
          {
            memoTodo?.history.slice(page * 10, (page + 1) * 10).map((historyItem, historyItemIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className={classes.card} key={historyItemIndex}>
                <span>
                  <b>{historyItem.author?.name}</b>
                  {' '}
                  {!historyItemIndex ? 'created at ' : 'changed at '}
                  {' '}
                  <b>{historyItem.createdAt.toISOString()}</b>
                  {' '}
                  with text
                </span>
                <p>{historyItem.text}</p>
              </div>
            ))
          }
        </div>
        <div className={classes.pagination}>
          {
            new Array(Math.ceil((memoTodo?.history.length || 0) / 10)).fill(null).map((_, digitIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <button key={digitIndex} type="button" className={clsx({ [classes.isActive]: page === digitIndex })} onClick={() => setPage(digitIndex)}>{digitIndex + 1}</button>
            ))
          }
        </div>
      </div>
    </Container>
  );
};

export default TodoHistory;
