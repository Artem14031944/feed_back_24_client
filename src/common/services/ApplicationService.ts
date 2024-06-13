import { IApplicationResponse, IApplicationCreateResponse, IApplicationMessageResponse } from '../models/response/ApplicationResponse';
import { AxiosResponse } from 'axios';
import $api from "../http";

export default class ApplicationService {
    static async fetchApllication(): Promise<AxiosResponse<IApplicationResponse[]>> {
        return $api.get<IApplicationResponse[]>('/application/get_all_applications');
    };

    static async resolved(id: number, comment: string): Promise<AxiosResponse<IApplicationMessageResponse>> {
        return $api.patch<IApplicationMessageResponse>(`/application/resolved/${id}`, { comment });
    };

    static async createApplication(user_id: number, message: string): Promise<AxiosResponse<IApplicationCreateResponse>> {
        return $api.post<IApplicationCreateResponse>('/application/create', { user_id, message });
    };

    static async getЕheirApplications(user_id: number): Promise<AxiosResponse<IApplicationResponse[]>> {
        return $api.get<IApplicationResponse[]>(`/application/get_applications/${user_id}`);
    };
};