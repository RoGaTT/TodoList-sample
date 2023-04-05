import { ID } from '@/utils/types/model.type';
import { UserType } from './user.type';

export type TodoModel = {
  _id: ID,
  author: ID,
  text: string,
  createdAt: Date,
  updatedAt: Date,
  level: number;
  history: Array<{
    author: ID,
    text: string,
    createdAt: Date
  }>
  items: Array<ID>
}

export type TodoType = {
  _id: ID,
  author?: UserType,
  text: string,
  createdAt: Date,
  updatedAt: Date,
  level: number;
  history: Array<{
    author?: UserType,
    text: string,
    createdAt: Date
  }>
  items: Array<TodoType>
}
