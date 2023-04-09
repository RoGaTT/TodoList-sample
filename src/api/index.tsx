import { v4 as uuidv4 } from 'uuid';
import { TodoModel, TodoType } from '@/types/todo.type';
import { UserModel, UserType } from '@/types/user.type';
import { ID } from '@/utils/types/model.type';
import { useUser } from '@/context/user.context';
import { useDatabase } from '@/context/database.context';

export const useApi = () => {
  const { database, setDatabase } = useDatabase();
  const { user } = useUser();

  const getTodoList = (): TodoModel[] => {
    if (!user) return [];

    return Object.values(database.todos).filter((todo) => !todo.level);
  };
  const getTodoById = (todoId?: ID): TodoModel | undefined => todoId && database.todos[todoId];
  const getUserById = (userId: ID): UserModel | undefined => {
    const recievedUser = database.users[userId];
    return recievedUser;
  };
  const getUserByName = (userName: string): UserModel | undefined => {
    const recievedUser = Object.values(database.users).find((user) => user.name === userName);
    return recievedUser;
  };

  const formatUserModel = (data?: UserModel): UserType | undefined => data;
  const formatTodoModel = (data?: TodoModel): TodoType | undefined => data && ({
    ...data,
    author: formatUserModel(getUserById(data.author)),
    history: data.history.map((historyItem) => ({
      ...historyItem,
      author: formatUserModel(getUserById(historyItem.author)),
    })),
    items: data.items.map(getTodoById).map(formatTodoModel).filter(Boolean) as TodoType[],
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  });

  const createUser = (data: Omit<UserModel, '_id'>): UserModel | undefined => {
    const newUser: UserModel = {
      _id: uuidv4() as ID,
      ...data,
    };
    setDatabase({
      ...database,
      users: {
        ...database.users,
        [newUser._id]: newUser,
      },
    });

    return newUser;
  };

  const createTodo = (data: { text: TodoModel['text'], level: TodoModel['level'], parentTodoId?: TodoModel['_id'] }): TodoModel | undefined => {
    if (!user) return undefined;

    const newTodo: TodoModel = {
      ...data,
      _id: uuidv4() as ID,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: user._id,
      items: [],
      history: [{
        author: user._id,
        createdAt: new Date(),
        text: data.text,
      }],
    };

    setDatabase({
      ...database,
      todos: {
        ...database.todos,
        [newTodo._id]: newTodo,
        ...(data.parentTodoId ? {
          [data.parentTodoId]: {
            ...database.todos[data.parentTodoId],
            items: [
              ...database.todos[data.parentTodoId].items,
              newTodo._id,
            ],
          },
        } : {}),
      },
    });

    return newTodo;
  };

  const updateTodoById = (todoId: ID, data: { text: string }): TodoModel | undefined => {
    const existingTodo = getTodoById(todoId);
    if (!existingTodo) return undefined;
    if (data.text === existingTodo.text) return existingTodo;

    const newData: TodoModel = {
      ...existingTodo,
      history: [
        ...existingTodo.history,
        {
          author: user?._id as unknown as ID,
          createdAt: new Date(),
          text: data.text,
        },
      ],
      text: data.text,
      updatedAt: new Date(),
    };

    if (data.text !== existingTodo.text && user) {
      newData.history.push({
        author: user._id,
        createdAt: new Date(),
        text: data.text,
      });
    }

    setDatabase({
      ...database,
      todos: {
        ...database.todos,
        [todoId]: newData,
      },
    });

    return newData;
  };

  const removeTodoById = (todoId: ID, data?: typeof database.todos): TodoModel | undefined => {
    const existingTodo = database.todos[todoId];
    if (!existingTodo) return undefined;

    const buffer = JSON.parse(JSON.stringify(data || database.todos));

    for (const innerTodoId of existingTodo.items) {
      removeTodoById(innerTodoId, buffer);
    }
    delete buffer[todoId];

    setDatabase({
      ...database,
      todos: buffer,
    });

    return existingTodo;
  };

  return {
    getTodoList: () => getTodoList().map(formatTodoModel).filter(Boolean) as TodoType[],
    getUserById: (userId: ID) => formatUserModel(getUserById(userId)),
    getUserByName: (userName: string) => formatUserModel(getUserByName(userName)),
    getTodoById: (todoId?: ID) => formatTodoModel(getTodoById(todoId)),
    createUser: (data: Omit<UserModel, '_id'>) => formatUserModel(createUser(data)),
    createTodo: (data: { text: TodoModel['text'], level: TodoModel['level'], parentTodoId?: TodoModel['_id'] }) => formatTodoModel(createTodo(data)),
    updateTodoById: (todoId: ID, data: { text: string }) => formatTodoModel(updateTodoById(todoId, data)),
    removeTodoById: (todoId: ID) => formatTodoModel(removeTodoById(todoId)),
  };
};
