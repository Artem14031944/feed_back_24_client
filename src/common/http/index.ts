import axios, { InternalAxiosRequestConfig } from "axios";

export const API_URL = process.env.REACT_APP_SERVER_URL; 

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config: InternalAxiosRequestConfig<string>) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config
});

export default $api;