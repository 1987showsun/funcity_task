import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
    // 在發送請求之前做一些事情
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN');
    config.headers = AUTH_TOKEN? ({ ...config.headers, authorization: `bearer ${AUTH_TOKEN}` }): delete config.headers.authorization;
    return config;
  }, (error) => {
    // 執行請求錯誤的操作
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if( error.response.status===401 ){
        localStorage.clear();
        window.location.href = '/sign';
    }
    return Promise.reject(error);
});

const AXIOS = ({
    method = 'get',
    path   = '',
    data   = null,
    params = null
}) => axios({
    method  : method,
    baseURL : API_URL,
    url     : path,
    ...data   && {data   : data  },
    ...params && {params : params}
})

export default AXIOS;