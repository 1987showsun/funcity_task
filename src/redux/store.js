import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

// redusers
import auth from './reducers/auth';
import account from './reducers/account';

export default configureStore({
    reducer: {
        auth,
        account
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: false//'production'//process.env.NODE_ENV,
})