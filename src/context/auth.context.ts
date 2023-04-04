import React from 'react';

export type AuthType = {
  username: string | null
}

type AuthContextType = {
  auth?: AuthType,
  setAuth: (auth?: AuthType) => void
}
const AuthContext = React.createContext<AuthContextType>({
  auth: undefined,
  setAuth: () => { },
});

export default AuthContext;
