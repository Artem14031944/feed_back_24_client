import { IUser } from '../models/IUser';
import { AxiosResponse } from 'axios';
import $api from "../http";

export default class AuthUser {
    static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    };
};