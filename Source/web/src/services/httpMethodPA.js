import axios from 'axios';

axios.defaults.preflightContinue = true;

export const axiosApi = axios.create({
    timeout: 60000,

    // mode: 'cors',
    header: { 'Access-Control-Allow-Origin': '*' },
    withCredentials: true,
});

axiosApi.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export const attachTokenToHeader = (token) => {
    if (token) {
        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosApi.defaults.headers.common['Authorization'];
    }
};

export const attachFunctionCodeToHeader = (functionCode) => {
    axiosApi.defaults.headers.common['Function-Code'] = `${functionCode || ''}`;
};
export const attachi18nToHeader = (lang) => {
    axiosApi.defaults.headers.common['Accept-Language'] = `${lang || 'vi'}`;
};
export const removeInterceptors = () => {
    axiosApi.interceptors.request.eject(this.interceptors);
};

const handleResponse = (response, error, isSuccess, url) => {
    if (isSuccess) {
        return response;
    } else {
        if (error.response && error.response.status === 401) {
            if (
                (url || '').includes('idp/authenticate') ||
                (url || '').includes('idp/profile')
            ) {
                return error?.response;
            }
            // clear token
            localStorage.removeItem('userGiayDiDuong');
            window.location.reload();
            return;
        }
        return error.response;
    }
};
export async function sendPost(url, data, config = {}) {
    try {
        const response = await axiosApi.post(url, data, config);
        return handleResponse(response, {}, true, url);
    } catch (error) {
        return handleResponse({}, error, false, url);
    }
}
export async function sendGet(url, config = {}) {
    try {
        const response = await axiosApi.get(url, config);
        return handleResponse(response, {}, true, url);
    } catch (error) {
        return handleResponse({}, error, false, url);
    }
}

export async function sendPatch(url, data, config = {}) {
    try {
        const response = await axiosApi.patch(url, data, config);
        return handleResponse(response, {}, true, url);
    } catch (error) {
        return handleResponse({}, error, false, url);
    }
}
export async function get(url, data, config = {}) {
    // console.log(data);
    return await axiosApi
        .get(url, data, { ...config })
        .then((response) => response.data)
        .catch((error) => error);
}

export async function getApi(url, data, config = {}) {
    console.log(config, 'config');
    return await axiosApi
        .get(url, data, { ...config })
        .then((response) => response)
        .catch((error) => error);
}

export async function post(url, data, config = {}) {
    return await axiosApi
        .post(`${url}`, { ...data }, { ...config })
        .then((res) => res?.data)
        .catch((error) => error);
}
export async function postApi(url, data, config = {}) {
    return await axiosApi
        .post(`${url}`, { ...data }, { ...config })
        .then((res) => res)
        .catch((error) => error);
}

export async function put(url, data, config = {}) {
    return await axiosApi
        .put(url, { ...data }, { ...config })
        .then((response) => response.data)
        .catch((error) => error);
}

export async function putApi(url, data, config = {}) {
    return await axiosApi
        .put(url, { ...data }, { ...config })
        .then((response) => response)
        .catch((error) => error);
}

export async function del(url, config = {}) {
    return await axiosApi
        .delete(url, { ...config })
        .then((response) => response.data)
        .catch((error) => error);
}

export function seo(data) {
    // data.title = data.title || "Hệ thống quản lý vacxin";
    // data.metaDescription = data.metaDescription || "CCCD";
    document.title = data.title;
    document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', data.metaDescription);
}
