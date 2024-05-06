import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// Redux store setup
import createStore from './redux/store';

// Router
import routes from './router';

// Stylesheets
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime : 500000,
      refetchOnWindowFocus: false
    }
  }
});

const Router = () => {
  const { token: AUTH_TOKEN } = useSelector(state => state.auth);

  // 刪除 caech;
  useEffect(() => {
    if(!AUTH_TOKEN){
      queryClient.removeQueries();
    }
  }, [AUTH_TOKEN]);

  return useRoutes(
    routes({
      token : AUTH_TOKEN
    })
  );
}

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={createStore}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>
);

reportWebVitals();
