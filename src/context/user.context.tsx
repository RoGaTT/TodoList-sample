import React, {
  createContext, PropsWithChildren, useContext, useEffect, useMemo, useState,
} from 'react';
import { UserType } from '@/types/user.type';

type UserContextType = {
  user?: UserType,
  setUser: (user?: UserType) => void
}
const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => { },
});

const getUserFromLocalStorage = () => {
  const localStorageUser = localStorage.getItem('todo-user');
  let userData: UserType | undefined;

  try {
    if (localStorageUser) userData = JSON.parse(localStorageUser) as UserType;
    if (userData?._id) return userData;
    return undefined;
  } catch (e) {
    console.log(`Failed to parse user form Local Storage: ${e}`);
  }
  return undefined;
};

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | undefined>(getUserFromLocalStorage());

  const memoUserContextValue = useMemo(() => ({
    user,
    setUser,
  }), [user]);

  // useEffect(() => {
  //   if (!user) return;

  //   const userData = api.getUserById(user._id);
  //   if (!userData) setUser(undefined);
  // }, [api, user]);

  useEffect(() => {
    if (user) localStorage.setItem('todo-user', JSON.stringify(user));
    else localStorage.setItem('todo-user', '');
  }, [user]);

  return (
    <UserContext.Provider value={memoUserContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const userContext = useContext(UserContext);

  return userContext;
};
