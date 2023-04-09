import React from 'react';
import { Ripple } from 'react-spinners-css';
import classes from './Loader.module.scss';

const Loader = () => (
  <div className={classes.root}>
    <Ripple color="#2C9683" />
  </div>
);

export default Loader;
