/* eslint-disable react/no-unstable-nested-components */
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ROUTES_CONFIG, { RouteEnum } from '@/const/routes.config';
import Layout from '@/utils/components/Layout';
import RequireAuthWrapper from '@/utils/components/RequireAuthWrapper';
import Loader from '@/components/Loader';

const HomePage = lazy(() => import('@/pages/Home'));
const SignInPage = lazy(() => import('@/pages/SignIn'));
const TodoHistoryPage = lazy(() => import('@/pages/TodoHistory'));

const App = () => (
  <Layout>
    <Routes>
      <Route
        path={ROUTES_CONFIG[RouteEnum.HOME]}
        element={(
          <Suspense fallback={<Loader />}>
            <RequireAuthWrapper>
              <HomePage />
            </RequireAuthWrapper>
          </Suspense>
        )}
      />
      <Route
        path={ROUTES_CONFIG[RouteEnum.TODO_HISTORY]}
        element={(
          <Suspense fallback={<Loader />}>
            <RequireAuthWrapper>
              <TodoHistoryPage />
            </RequireAuthWrapper>
          </Suspense>
        )}
      />
      <Route path={ROUTES_CONFIG[RouteEnum.SIGN_IN]} element={<SignInPage />} />
    </Routes>
  </Layout>
);

export default App;
