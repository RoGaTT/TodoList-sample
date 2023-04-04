import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTES_CONFIG, { RouteEnum } from '@/const/routes.config';
import Layout from '@/utils/components/Layout';

const HomePage = lazy(() => import('@/pages/Home'));

const App = () => {
  console.log('object');
  return (
    <Layout>
      <Routes location="/">
        <Route path={ROUTES_CONFIG[RouteEnum.HOME]} element={<HomePage />} />
      </Routes>
    </Layout>
  );
};

export default App;
