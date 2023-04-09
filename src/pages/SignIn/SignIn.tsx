import React, {
  EventHandler,
  useCallback, useContext, useEffect, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@/utils/components/Container';
import classes from './SignIn.module.scss';
import ROUTES_CONFIG, { RouteEnum } from '@/const/routes.config';
import { useUser } from '@/context/user.context';
import { useApi } from '@/api';
import { UserType } from '@/types/user.type';
import App from '@/App';

const SignIn = () => {
  const { user, setUser } = useUser();

  const nameInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    if (user) navigate(ROUTES_CONFIG[RouteEnum.HOME]);
  }, [user, navigate]);

  const memoOnSubmit = useCallback(onSubmit, [api, setUser]);

  return (
    <Container className={classes.root}>
      <form className={classes.content} onSubmit={memoOnSubmit}>
        <label>
          <span>Username</span>
          <input type="text" ref={nameInputRef} />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </Container>
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = nameInputRef.current?.value;

    if (!name) return;

    const existingUser = api.getUserByName(name);
    let user = existingUser;
    if (!existingUser) {
      user = api.createUser({
        name,
      }) as UserType;
    }

    setUser(user);
  }
};

export default SignIn;
