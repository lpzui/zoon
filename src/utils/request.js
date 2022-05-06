import axios from 'axios';

const service = axios.create({
    //baseURL: "eeeee", // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    baseURL: 'http://localhost:8808/labor/system',
    timeout: 5000 // request timeout
})


service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
