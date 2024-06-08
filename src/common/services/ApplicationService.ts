import { IAppliacationResponse } from '../models/response/ApplicationResponse';
import { AxiosResponse } from 'axios';
import $api from "../http";

export default class ApplicationService {
    static async fetchApllication(): Promise<AxiosResponse<IAppliacationResponse[]>> {
        return $api.get<IAppliacationResponse[]>('/application/get_applications');
    };
};