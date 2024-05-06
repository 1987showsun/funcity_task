import AXIOS from '../../hooks/axios';
import API from '../../hooks/api.json';

export const getAllAccounts = (props) => {
    const {
        data,
        params
    } = props;
    return async(dispatch) => {
        try{
            const res = await AXIOS({
                method : 'get',
                path   : API.account.profile,
                data,
                params,
            });

            dispatch({
                type    : "SET_ACCOUNTS",
                payload : res.data.accounts
            });

            return {
                list: res.data.accounts
            };
        }catch(err){

        }
    }
}