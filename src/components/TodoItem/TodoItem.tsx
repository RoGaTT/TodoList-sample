import React, { useRef, useState } from 'react';
import { FaList } from '@react-icons/all-files/fa/FaList';
import { FaHistory } from '@react-icons/all-files/fa/FaHistory';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { useNavigate } from 'react-router-dom';
import { TodoType } from '@/types/todo.type';
import classes from './TodoItem.module.scss';
import { useApi } from '@/api';

type PropsType = {
  data: TodoType,
  level: number
}

const TodoItem: React.FC<PropsType> = ({ data, level = 0 }) => {
  const [isListOpen, setListOpenState] = useState<boolean>(false);
  const textInputref = useRef<HTMLTextAreaElement>(null);

  const api = useApi();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <div className={classes['card-content']}>
          <div>
            <span>{data.author?.name}</span>
            <b>{data.createdAt.toDateString()}</b>
          </div>
          <textarea
            rows={6}
            defaultValue={data.text}
            ref={textInputref}
            onBlur={() => {
              api.updateTodoById(data._id, {
                ...data,
                text: textInputref.current?.value || '',
              });
            }}
          />
        </div>
        <div className={classes['card-controls']}>
          <button type="button">
            <FaList color="white" onClick={() => setListOpenState(!isListOpen)} size="20" />
          </button>
          <button type="button" aria-label="Watch history">
            <FaHistory color="white" onClick={() => navigate(`/todo/${data._id}`)} size="20" />
          </button>
          <button type="button" aria-label="Remove todo">
            <FaTrash color="white" onClick={() => api.removeTodoById(data._id)} size="20" />
          </button>
          <button type="button" aria-label="Add inner todo">
            <FaPlus
              color="white"
              onClick={() => api.createTodo({
                level: level + 1,
                text: '',
                parentTodoId: data._id,
              })}
              size="20"
            />
          </button>
        </div>
      </div>
      {
        isListOpen && (
          <div className={classes.list}>
            {
              data.items.map((innerTodo) => (
                <TodoItem key={data._id} data={innerTodo} level={innerTodo.level || level + 1} />
              ))
            }
          </div>
        )
      }
    </div>
  );
};

export default TodoItem;
