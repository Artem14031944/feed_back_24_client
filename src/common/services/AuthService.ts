import { IAuthResponse } from '../models/response/AuthResponse';
import { AxiosResponse } from 'axios';
import $api from "../http";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/user/login', { email, password });
    };

    static async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/user/registration', { email, password });
    };

    static async logout(): Promise<void> {
        return $api.post('/user/logout');
    };
};

