import AXIOS from '../../hooks/axios';
import API from '../../hooks/api.json';
import { jwtDecode } from "jwt-decode";

export const getPostListAction = (props) => {

    const {
        params
    } = props;

    return async(dispatch) => {
        try{

            const callApi = async() => {

                const token = localStorage.getItem('AUTH_TOKEN');
                const { role } = jwtDecode(token);

                if( role!=="user" ){
                    const adminPostRes = await AXIOS({
                        method : 'get',
                        path   : API.post.adminList,
                        params : params
                    });
                    const myPostRes    = await AXIOS({
                        method : 'post',
                        path   : API.post.myPostList,
                        params : params
                    });
                    return {
                        list: adminPostRes.data.data,
                        pagination: {
                            page        : adminPostRes.data.page,
                            limit       : adminPostRes.data.limit,
                            totalPages  : adminPostRes.data.totalPages,
                            totalPosts  : adminPostRes.data.totalPosts,
                            totalMyPosts: myPostRes.data.totalPosts
                        }
                    }
                }else{
                    const myPostRes = await AXIOS({
                        method : role!=="user"? 'get':'post',
                        path   : role!=="user"? API.post.adminList:API.post.myPostList,
                        params : params
                    });

                    return {
                        list: myPostRes.data.data,
                        pagination: {
                            page        : myPostRes.data.page,
                            limit       : myPostRes.data.limit,
                            totalPages  : myPostRes.data.totalPages,
                            totalPosts  : myPostRes.data.totalPosts,
                            totalMyPosts: myPostRes.data.totalPosts
                        }
                    }
                }
            }

            return await callApi();

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