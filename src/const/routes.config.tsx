import { RouteObject } from 'react-router-dom';
import Home from '@/pages/Home';
import App from '../App';

export enum RouteEnum {
  HOME = 'home'
}

const ROUTES_CONFIG: Record<RouteEnum, string> = {
  [RouteEnum.HOME]: '/',
};

export default ROUTES_CONFIG;
