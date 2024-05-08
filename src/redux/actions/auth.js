import AXIOS from '../../hooks/axios';
import API from '../../hooks/api.json';

export const registerNewUserAction = (props) => {
    const {
        data,
        params
    } = props;
    return async(dispatch) => {
        try{
            const res = await AXIOS({
                method : 'post',
                path   : API.auth.register,
                data,
                params,
            });
            return res;
        }catch(err){
            return err.response;
        }
    }
}

export const signinUserAction = (props) => {
    const {
        data,
        params
    } = props;
    return async(dispatch) => {
        try{
            const res = await AXIOS({
                method : 'post',
                path   : API.auth.signin,
                data,
                params,
                
            });

            localStorage.setItem('USER_ID', res.data.userId);
            localStorage.setItem('AUTH_TOKEN', res.data.token);

            dispatch({
                type    : "SET_AUTH_TOKEN",
                payload : {
                    id   : res.data.userId,
                    token: res.data.token
                }
            });
            return res
        }catch(err){
            return err.response;
        }
    }
}

export const logoutUserAction = (props) => {
    return async(dispatch) => {
        localStorage.removeItem('AUTH_TOKEN');
        dispatch({
            type    : "SET_AUTH_TOKEN",
            payload : null
        })
    }
}