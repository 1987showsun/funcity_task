import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Pages
const App = lazy(() => import('../App'));

const Auth = lazy(() => import('../pages/auth'));
const SignIn = lazy(() => import('../pages/auth/signin'));
const SignUp = lazy(() => import('../pages/auth/signup'));

const Account = lazy(() => import('../pages/account'));
const Post = lazy(() => import('../pages/account/post'));
const PostList = lazy(() => import('../pages/account/post/list'));
const PostDetails = lazy(() => import('../pages/account/post/details'));

const Index = ({ token }) => [{
    path    : '/*',
    element : <App/>,
    children: [
        !token? (
            {
                path    : 'sign',
                element : <Auth />,
                children: [
                    {
                        index: true,
                        element: <SignIn />
                    },
                    {
                        path: 'up',
                        element: <SignUp />
                    },
                    {
                        path: '*',
                        element: <Navigate to="/sign" replace />
                    }
                ]
            }
        ):(
            {
                path    : 'account',
                element : <Account />,
                children: [
                    {
                        path: 'post',
                        element: <Post />,
                        children: [
                            {
                                index: true,
                                element: <PostList />,
                            },
                            {
                                path: ':id',
                                element: <PostDetails />
                            }
                        ]
                    },
                    {
                        path: '*',
                        element: <Navigate to="/account/post" replace />
                    }
                ]
            }
        ),
        {
            path: '*',
            element: <Navigate to={!token?"/sign":"/account/post"} replace />
        }
    ]
}];

export default Index;