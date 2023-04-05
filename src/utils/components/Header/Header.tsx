/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from '@react-icons/all-files/fa/FaSignOutAlt';
import classes from './Header.module.scss';
import ROUTES_CONFIG, { RouteEnum } from '@/const/routes.config';
import { useUser } from '@/context/user.context';
import Container from '../Container';
import LogoIcon from '@/assets/img/logo.svg';

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  return (
    <Container>
      <div className={classes.root}>
        <button type="button" onClick={() => navigate(ROUTES_CONFIG[RouteEnum.SIGN_IN])}>
          {/* <img src={LogoIcon} alt="" /> */}
          <LogoIcon fill="white" width="48px" height="48px" />
        </button>
        <nav>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(ROUTES_CONFIG[RouteEnum.HOME]);
            }}
          >
            Todo list
          </a>
        </nav>
        <div className={classes.profile}>
          <span>{user?.name || 'N/A'}</span>

          <FaSignOutAlt color="white" onClick={() => setUser(undefined)} size="40" />
        </div>
      </div>
    </Container>
  );
};

export default Header;
