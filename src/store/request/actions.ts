import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    timeout: 30 * 60 * 1000,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 403) {
//       if (window.location.pathname !== "/login") {
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

function createConfig(getState: () => RootState, config: any) {
    // const {
    //     account: {
    //         auth: { token },
    //     },
    // } = getState();
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            // ...(token
            //     ? { Authorization: `Bearer ${getState().account.auth.token}` }
            //     : {}),
            ...config?.headers,
        },
    };
}

export const GET =
    (getState: () => RootState) =>
        <T = any, D = any>(url: string, config?: AxiosRequestConfig<any>) =>
            new Promise<AxiosResponse<T, D>>((resolve, reject) => {
                axiosInstance
                    .get(`${url}`, createConfig(getState, config))
                    .then(resolve)
                    .catch(reject);
            });

export const POST =
    (getState: () => RootState) =>
        <T = any, D = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig<any>
        ) =>
            new Promise<AxiosResponse<T, D>>((resolve, reject) => {
                axiosInstance
                    .post(`${url}`, data, createConfig(getState, config))
                    .then(resolve)
                    .catch(reject);
            });

export const PUT =
    (getState: () => RootState) =>
        <T = any, D = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig<any>
        ) =>
            new Promise<AxiosResponse<T, D>>((resolve, reject) => {
                axiosInstance
                    .put(`${url}`, data, createConfig(getState, config))
                    .then(resolve)
                    .catch(reject);
            });

export const PATCH =
    (getState: () => RootState) =>
        <T = any, D = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig<any>
        ) =>
            new Promise<AxiosResponse<T, D>>((resolve, reject) => {
                axiosInstance
                    .patch(`${url}`, data, createConfig(getState, config))
                    .then(resolve)
                    .catch(reject);
            });

export const DELETE =
    (getState: () => RootState) =>
        <T = any, D = any>(url: string, config?: AxiosRequestConfig<any>) =>
            new Promise<AxiosResponse<T, D>>((resolve, reject) => {
                axiosInstance
                    .delete(`${url}`, createConfig(getState, config))
                    .then(resolve)
                    .catch(reject);
            });