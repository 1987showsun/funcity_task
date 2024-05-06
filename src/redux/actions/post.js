import AXIOS from '../../hooks/axios';
import API from '../../hooks/api.json';
import { jwtDecode } from "jwt-decode";

export const getPostListAction = (props) => {

    const {
        params
    } = props;

    return async(dispatch) => {
        try{

            const token = localStorage.getItem('AUTH_TOKEN');
            const { role } = jwtDecode(token);

            const res = await AXIOS({
                method : role!=="user"? 'get':'post',
                path   : role!=="user"? API.post.adminList:API.post.myPostList,
                params : params
            });

            return {
                list       : res.data.data,
                pagination : {
                    page      : res.data.page,
                    limit     : res.data.limit,
                    totalPages: res.data.totalPages,
                    totalPosts: res.data.totalPosts,
                }
            };
        }catch(err){

        }
    }
}

export const addPostAction = (props) => {
    const {
        data,
        params
    } = props;
    return async(dispatch) => {
        const res = await AXIOS({
            method: 'post',
            path  : API.post.create,
            data,
            params
        });

        return res;
    }
}

export const editPostAction = (props) => {
    const {
        data,
        params
    } = props;
    return async(dispatch) => {
        const res = await AXIOS({
            method: 'put',
            path  : `${API.post.edit}${data.id}`,
            data,
            params
        });

        return res;
    }
}

export const deletePostAction = (props) => {
    const {
        data,
        params
    } = props;
    return async(dispatch) => {
        const res = await AXIOS({
            method: 'delete',
            path  : `${API.post.delete}${data.id}`,
            data,
            params
        });

        return res;
    }
}

export const getPostDetailAction = (props) => {
    const {
        data,
        params
    } = props;
    return async(dispatch) => {
        const res = await AXIOS({
            method: 'get',
            path  : `${API.post.view}${params.id}`,
        });

        return res.data;
    }
}