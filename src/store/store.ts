import { IApplicationResponse } from "../common/models/response/ApplicationResponse";
import { IAuthResponse, IUser } from "../common/models/response/UserResponse";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../common/http";
import ApplicationService from "../common/services/ApplicationService";
import UserService from "../common/services/UserService";
import axios from "axios";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;
    message = '';
        
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

    setMessage(message: string) {
        this.message = message;
    };
  
    async login(email: string, password: string) {
        try {
            const response = await UserService.login(email, password);     
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e?.response?.data?.message);
        }
    };

    async registration(email: string, password: string, name: string, role: string) {
        try {
            const response = await UserService.registration(email, password, name, role);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e?.response?.data?.message);
        }
    };

    async createApplication(user_id: number, message: string) {
        try {
           await ApplicationService.createApplication(user_id, message);
        } catch (e: any) {
            console.log(e?.response?.data?.message);
        }
    };

    async resolved(id: number, comment: string) {
        try {
            const response = await ApplicationService.resolved(id, comment);
            this.setMessage(response.data.message);
        } catch (e: any) {
            console.log(e?.response?.data?.message);
        }
    };

    async loguot() {
        try {
            await UserService.logout();
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