import React, { useEffect, useState } from 'react';
import classes from '@/App/App.module.scss';
import testImg from '@/assets/img/test.jpg';

const App = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(3);
    console.log(count);
  }, [count]);

  return (
    <div>
      <h1>dasdas</h1>
      <img src="" alt="" />
    </div>
  );
};

export default App;
