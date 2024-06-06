import { IAuthResponse } from "../common/models/response/AuthResponse";
import { IUser } from "../common/models/IUser";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../common/http";
import AuthService from "../common/services/AuthService";
import axios from "axios";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    
    constructor() {
        makeAutoObservable(this);
    };

    setAuth(bool: boolean) {
       this.isAuth = bool; 
    };

    setUser(user: IUser) {
        this.user = user;
    };

    setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    };

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response, 'res log');
            
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e?.response?.data?.message);
        }
    };

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response, 'res registration');
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e?.response?.data?.message);
        }
    };

    async loguot() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e?.response?.data?.message);
        }
    };

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/user/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e?.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    };
}