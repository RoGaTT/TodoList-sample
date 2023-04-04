import React, { useContext } from 'react';
import AuthContext from '@/context/auth.context';
import classes from './Header.module.scss';

const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <div className={classes.root} />
  );
};

export default Header;
