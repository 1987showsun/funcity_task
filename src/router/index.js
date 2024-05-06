import { Navigate } from 'react-router-dom';

// Pages
import App from '../App';
import Auth from '../pages/auth';
import SignIn from '../pages/auth/signin';
import SignUp from '../pages/auth/signup';

import Account from '../pages/account';
import Post from '../pages/account/post';
import PostList from '../pages/account/post/list';
import PostDetails from '../pages/account/post/details';

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