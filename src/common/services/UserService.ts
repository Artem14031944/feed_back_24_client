import { IAuthResponse } from '../models/response/UserResponse';
import { AxiosResponse } from 'axios';
import $api from "../http";

export default class UserService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/user/login', { email, password });
    };

    static async registration(email: string, password: string, name: string, role: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/user/registration', { email, password, name, role });
    };

    static async logout(): Promise<void> {
        return $api.post('/user/logout');
    };
};

