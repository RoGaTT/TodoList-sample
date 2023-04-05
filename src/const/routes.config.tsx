import { RouteObject } from 'react-router-dom';
import Home from '@/pages/Home';
import App from '../App';

export enum RouteEnum {
  HOME = 'home',
  SIGN_IN = 'sign_in',
  TODO_HISTORY = 'todo_history'
}

const ROUTES_CONFIG: Record<RouteEnum, string> = {
  [RouteEnum.HOME]: '/',
  [RouteEnum.SIGN_IN]: '/sign_in',
  [RouteEnum.TODO_HISTORY]: '/todo/:id',
};

export default ROUTES_CONFIG;
