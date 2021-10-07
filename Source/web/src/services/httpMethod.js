import axios from 'axios';
import { cloneDeep } from 'lodash';
import { BASE_API } from '../requests/ApiConfig';

class HttpMethod {
    constructor() {
        this.axios = axios;
        this.axios.defaults.baseURL = BASE_API;
    }

    get(...arg) {
        console.log(...arg, this.axios, 'arg');
        return this.axios.get(...arg);
    }

    post(...arg) {
        return this.axios.post(...arg);
    }

    put(...arg) {
        return this.axios.put(...arg);
    }

    attachTokenToHeader(token) {
        this.axios.interceptors.request.use(
            (config) => {
                const cloneConfig = cloneDeep(config);
                cloneConfig.headers['Accept'] = 'application/json';
                cloneConfig.headers['Content-Type'] = 'application/json';
                cloneConfig.headers['Access-Control-Allow-Origin'] = '*';
                cloneConfig.header['Authorization'] = `Bearer ${token || ''}`;
                return cloneConfig;
            },
            (error) => {
                return Promise.reject(error);
            },
        );
    }
}

export default new HttpMethod();
