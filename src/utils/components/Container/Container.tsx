/* eslint-disable react/require-default-props */
import React, { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';

import classes from './Container.module.scss';

type PropsType = {
    children: React.ReactNode,
    wrapperClassName?: string,
    className?: string,
    id?: string
    setRef?: { (ref: React.RefObject<HTMLDivElement>): void };
}

const Container: FC<PropsType> = ({
  children, wrapperClassName, className, id, setRef,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setRef?.(ref);
  }, [setRef]);

  return (
    <div {...(id ? { id } : {})} ref={ref} className={clsx(classes.root, wrapperClassName)}>
      <div className={clsx(classes.content, className)}>
        {children}
      </div>
    </div>
  );
};

export default Container;
