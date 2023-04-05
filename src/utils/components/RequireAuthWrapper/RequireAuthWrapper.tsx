import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/context/user.context';
import ROUTES_CONFIG, { RouteEnum } from '@/const/routes.config';
import { useApi } from '@/api';
import { UserModel, UserType } from '@/types/user.type';

const RequireAuthWrapper: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to={ROUTES_CONFIG[RouteEnum.SIGN_IN]} state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuthWrapper;
